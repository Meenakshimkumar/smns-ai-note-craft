
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Pen, Save, Trash } from "lucide-react";

interface HandwritingCanvasProps {
  width?: number;
  height?: number;
  onSave?: (dataUrl: string) => void;
}

export const HandwritingCanvas = ({
  width = 800,
  height = 400,
  onSave
}: HandwritingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext("2d");
    if (!context) return;
    
    // Set initial canvas styles
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = 3;
    context.strokeStyle = "#8B5CF6"; // Our purple color
    
    // Adjust canvas size to match container and handle high-DPI displays
    const handleResize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = 400 * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `400px`;
      
      // Scale context to account for high-DPI displays
      context.scale(dpr, dpr);
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = 3;
      context.strokeStyle = "#8B5CF6";
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    setCtx(context);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  useEffect(() => {
    if (!ctx) return;
    
    if (tool === "pen") {
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#8B5CF6";
    } else {
      ctx.lineWidth = 15;
      ctx.strokeStyle = "#ffffff";
    }
  }, [tool, ctx]);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    if (!ctx || !canvasRef.current) return;
    
    let x: number, y: number;
    
    if ("touches" in e) {
      const rect = canvasRef.current.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;
    
    let x: number, y: number;
    
    if ("touches" in e) {
      const rect = canvasRef.current.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  
  const stopDrawing = () => {
    if (!ctx) return;
    
    setIsDrawing(false);
    ctx.closePath();
  };
  
  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };
  
  const saveCanvas = () => {
    if (!canvasRef.current || !onSave) return;
    
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onSave(dataUrl);
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex space-x-2">
          <Button
            type="button"
            size="sm"
            variant={tool === "pen" ? "default" : "outline"}
            onClick={() => setTool("pen")}
            className={tool === "pen" ? "bg-smns-purple hover:bg-smns-purple-dark" : ""}
          >
            <Pen className="h-4 w-4 mr-2" />
            Pen
          </Button>
          <Button
            type="button"
            size="sm"
            variant={tool === "eraser" ? "default" : "outline"}
            onClick={() => setTool("eraser")}
            className={tool === "eraser" ? "bg-smns-purple hover:bg-smns-purple-dark" : ""}
          >
            <Eraser className="h-4 w-4 mr-2" />
            Eraser
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={clearCanvas}
          >
            <Trash className="h-4 w-4 mr-2" />
            Clear
          </Button>
          {onSave && (
            <Button
              type="button"
              size="sm"
              onClick={saveCanvas}
              className="bg-smns-purple hover:bg-smns-purple-dark"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          )}
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <canvas
          ref={canvasRef}
          className="w-full touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 italic font-handwriting text-center">
          Your handwriting will appear as text here when converted...
        </p>
      </div>
    </div>
  );
};
