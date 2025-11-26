import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SSGDebugInfo {
  route: string;
  generatedAt: string;
  dehydratedStateSize: number;
  queriesCount: number;
  buildVersion: string;
  contentHash: string;
}

export function SSGDebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<SSGDebugInfo | null>(null);

  useEffect(() => {
    const info = (window as any).__SSG_DEBUG__;
    if (info) {
      setDebugInfo(info);
    }

    // Open panel with Ctrl+Shift+D
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!debugInfo || !isOpen) return null;

  const timeSinceGeneration = Math.floor(
    (Date.now() - new Date(debugInfo.generatedAt).getTime()) / 1000 / 60
  );

  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-md">
      <Card className="shadow-2xl border-2 border-primary bg-background">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-mono">
              🔍 SSG Debug Panel
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Route:</span>
            <Badge variant="outline" className="text-xs">{debugInfo.route}</Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Generated:</span>
            <span className="text-foreground">{timeSinceGeneration}m ago</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">State Size:</span>
            <span className="text-foreground">{(debugInfo.dehydratedStateSize / 1024).toFixed(1)} KB</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Cached Queries:</span>
            <Badge variant="secondary">{debugInfo.queriesCount}</Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Build Version:</span>
            <span className="text-foreground">{debugInfo.buildVersion}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Content Hash:</span>
            <code className="text-xs text-foreground">{debugInfo.contentHash}</code>
          </div>

          <div className="pt-2 border-t">
            <span className="text-xs text-muted-foreground">
              Press <kbd className="px-1 py-0.5 rounded bg-muted text-foreground">Ctrl+Shift+D</kbd> to toggle
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
