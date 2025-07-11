
export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center text-foreground/60 space-y-1 text-sm">
          <p>&copy; 2025 Prompt2Plugin. All rights reserved.</p>
          <p className="text-xs">
            Made with{" "}
            <span className="inline dark:hidden">🖤</span>
            <span className="hidden dark:inline">🤍</span>
            {" "}by{" "}
            <a
              href="https://github.com/aryy8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium transition-colors"
            >
              @aryy8
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
