package main

import (
	"embed"
	"encoding/json"
	"errors"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path"
	"strings"
	"time"
)

const defaultAPIBaseURL = "https://shipray-logisticbackend.onrender.com"

// frontend contains the complete site so the Render binary has no external
// runtime file dependencies.
//
//go:embed index.html script.js styles.css assets
var frontend embed.FS

type browserConfig struct {
	APIBaseURL  string `json:"API_BASE_URL"`
	FrontendURL string `json:"FRONTEND_URL"`
}

func main() {
	port := strings.TrimSpace(os.Getenv("PORT"))
	if port == "" {
		port = "10000"
	}

	server := &http.Server{
		Addr:              ":" + port,
		Handler:           newHandler(),
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       30 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	log.Printf("Shipray frontend listening on %s", server.Addr)
	if err := server.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
		log.Fatal(err)
	}
}

func newHandler() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/healthz", healthHandler)
	mux.HandleFunc("/config.js", configHandler)
	mux.Handle("/", staticHandler())

	return securityHeaders(mux)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet && r.Method != http.MethodHead {
		w.Header().Set("Allow", "GET, HEAD")
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	if r.Method == http.MethodGet {
		_, _ = w.Write([]byte("ok\n"))
	}
}

func configHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet && r.Method != http.MethodHead {
		w.Header().Set("Allow", "GET, HEAD")
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	apiBaseURL := firstNonEmpty(os.Getenv("API_BASE_URL"), os.Getenv("BACKEND_URL"), defaultAPIBaseURL)
	frontendURL := firstNonEmpty(os.Getenv("FRONTEND_URL"), requestBaseURL(r))
	config, err := json.Marshal(browserConfig{
		APIBaseURL:  strings.TrimRight(apiBaseURL, "/"),
		FrontendURL: strings.TrimRight(frontendURL, "/"),
	})
	if err != nil {
		http.Error(w, "could not generate runtime configuration", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Cache-Control", "no-store")
	w.Header().Set("Content-Type", "application/javascript; charset=utf-8")
	if r.Method == http.MethodGet {
		_, _ = w.Write([]byte("window.SHIPRAY_CONFIG = Object.freeze("))
		_, _ = w.Write(config)
		_, _ = w.Write([]byte(");\n"))
	}
}

func staticHandler() http.Handler {
	files := http.FileServer(http.FS(frontend))

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet && r.Method != http.MethodHead {
			w.Header().Set("Allow", "GET, HEAD")
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		name := strings.TrimPrefix(path.Clean(r.URL.Path), "/")
		if name == "" || name == "." {
			name = "index.html"
		}

		info, err := fs.Stat(frontend, name)
		if err != nil || info.IsDir() {
			http.NotFound(w, r)
			return
		}

		if name == "index.html" {
			w.Header().Set("Cache-Control", "no-cache")
		} else {
			w.Header().Set("Cache-Control", "public, max-age=3600")
		}
		files.ServeHTTP(w, r)
	})
}

func securityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "SAMEORIGIN")
		next.ServeHTTP(w, r)
	})
}

func requestBaseURL(r *http.Request) string {
	scheme := "http"
	if forwardedProto := strings.TrimSpace(strings.Split(r.Header.Get("X-Forwarded-Proto"), ",")[0]); forwardedProto != "" {
		scheme = forwardedProto
	} else if r.TLS != nil {
		scheme = "https"
	}
	return scheme + "://" + r.Host
}

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if value = strings.TrimSpace(value); value != "" {
			return value
		}
	}
	return ""
}
