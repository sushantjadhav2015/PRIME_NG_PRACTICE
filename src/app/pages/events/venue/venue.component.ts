import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// shape.model.ts
export enum ShapeType {
  Rectangle = 'Rectangle',
  Circle = 'Circle',
  Triangle = 'Triangle',
  Square = 'Square',
  Parallelogram = 'Parallelogram',
  Rhombus = 'Rhombus',
  Trapezium = 'Trapezium',
  Hexagon = 'Hexagon',
  Polygon = 'Polygon',
}

export interface ShapeDimensions {
  width?: number;
  height?: number;
  radius?: number;
  base?: number;
  heightTriangle?: number;
  side?: number;
  side2?: number;
  heightParallelogram?: number;
  diagonal1?: number;
  diagonal2?: number;
  sideTrapeziumTop?: number;
  sideTrapeziumBottom?: number;
  heightTrapezium?: number;
  numOfSides: number;
}

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrl: './venue.component.scss',
})
export class VenueComponent implements OnInit {
  shapeForm: FormGroup;
  shapeTypes = Object.values(ShapeType);
  createdShape: any = null; // Holds the created shape as a string representation
  shapeType = Object.keys(ShapeType).map((key: any) => ({
    label: key,
    value: key,
  }));

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.shapeForm = this.fb.group({
      type: ['', Validators.required],
      dimensions: this.fb.group({
        width: [''],
        height: [''],
        radius: [''],
        base: [''],
        heightTriangle: [''],
        side: [''],
        side2: [''],
        heightParallelogram: [''],
        diagonal1: [''],
        diagonal2: [''],
        sideTrapeziumTop: [''],
        sideTrapeziumBottom: [''],
        heightTrapezium: [''],
        numOfSides: [''],
      }),
    });
  }
  ngOnInit(): void {}

  // get e() {
  //   this.shapeForm.value;
  //   return this.shapeForm.controls;
  // }
  onSubmit() {
    if (this.shapeForm.valid) {
      const selectedShape = this.shapeForm.value.type.value;
      const dimensions: ShapeDimensions = this.shapeForm.value.dimensions;
      // Call method to create shape with dimensions
      this.createdShape = this.createShape(selectedShape, dimensions);
    }
  }

  createShape(shapeType: ShapeType, dimensions: ShapeDimensions): SafeHtml {
    let shape = '';
    switch (shapeType) {
      case ShapeType.Rectangle:
        shape = this.createRectangle(dimensions);
        break;
      case ShapeType.Circle:
        shape = this.createCircle(dimensions);
        break;
      // case ShapeType.Triangle:
      //   shape = this.createTriangle(dimensions);
      //   break;
      // case ShapeType.Square:
      //   shape = this.createSquare(dimensions);
      //   break;
      // case ShapeType.Parallelogram:
      //   shape = this.createParallelogram(dimensions);
      //   break;
      // case ShapeType.Rhombus:
      //   shape = this.createRhombus(dimensions);
      //   break;
      // case ShapeType.Trapezium:
      //   shape = this.createTrapezium(dimensions);
      //   break;
      // case ShapeType.Hexagon:
      //   shape = this.createHexagon(dimensions);
      //   break;
      // case ShapeType.Polygon:
      //   shape = this.createPolygon(dimensions.numOfSides, dimensions.side);
      //   break;
    }
    return this.sanitizer.bypassSecurityTrustHtml(shape);
  }

  private createRectangle(dimensions: ShapeDimensions): string {
    const width = dimensions.width || 1;
    const height = dimensions.height || 1;
    const circleRadius = 10;
    const rows = Math.floor(height / (2 * circleRadius));
    const cols = Math.floor(width / (2 * circleRadius));
    const circles = this.generateCircles(ShapeType.Rectangle, dimensions, circleRadius);

    return `
      <div style="position: relative; width:${width}px; height:${height}px;">
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" fill="blue"></rect>
          ${circles}
        </svg>
      </div>`;
  }

  private createCircle(dimensions: ShapeDimensions): string {
    const radius = dimensions.radius || 1;
    const diameter = radius * 2;
    const circleRadius = 10;
    const rows = Math.floor(diameter / (2 * circleRadius));
    const cols = Math.floor(diameter / (2 * circleRadius));
    const circles = this.generateCircles(ShapeType.Circle,dimensions, circleRadius);

    return `
      <div style="position: relative; width:${diameter}px; height:${diameter}px;">
        <svg width="100%" height="100%">
          <circle cx="${radius}" cy="${radius}" r="${radius}" fill="green"></circle>
          ${circles}
        </svg>
      </div>`;
  }

  // private createTriangle(dimensions: ShapeDimensions): string {
  //   const base = dimensions.base || 1;
  //   const height = dimensions.heightTriangle || 1;
  //   const circleRadius = 10;
  //   const rows = Math.floor(height / (2 * circleRadius));
  //   const cols = Math.floor(base / (2 * circleRadius));
  //   const circles = this.generateCircles(rows, cols, circleRadius);

  //   return `
  //     <div style="position: relative; width:${base}px; height:${height}px;">
  //       <svg width="100%" height="100%">
  //         <polygon points="0,${height} ${
  //     base / 2
  //   },0 ${base},${height}" style="fill: red; stroke: black; stroke-width: 1;"></polygon>
  //         ${circles}
  //       </svg>
  //     </div>`;
  // }

  // private createSquare(dimensions: ShapeDimensions): string {
  //   const side = dimensions.side || 1;
  //   const circleRadius = 10;
  //   const rows = Math.floor(side / (2 * circleRadius));
  //   const cols = Math.floor(side / (2 * circleRadius));
  //   const circles = this.generateCircles(rows, cols, circleRadius);

  //   return `
  //     <div style="position: relative; width:${side}px; height:${side}px;">
  //       <svg width="100%" height="100%">
  //         <rect width="${side}" height="${side}" fill="yellow"></rect>
  //         ${circles}
  //       </svg>
  //     </div>`;
  // }

  // private createParallelogram(dimensions: ShapeDimensions): string {
  //   const width = dimensions.width || 1;
  //   const height = dimensions.heightParallelogram || 1;
  //   const circleRadius = 10;
  //   const rows = Math.floor(height / (2 * circleRadius));
  //   const cols = Math.floor(width / (2 * circleRadius));
  //   const circles = this.generateCircles(rows, cols, circleRadius);

  //   return `
  //     <div style="position: relative; width:${width}px; height:${height}px;">
  //       <svg width="100%" height="100%">
  //         <polygon points="0,${height} ${width},0 ${width / 2},${height} ${
  //     width / 2
  //   },0 0,${height}" style="fill: orange; stroke: black; stroke-width: 1;"></polygon>
  //         ${circles}
  //       </svg>
  //     </div>`;
  // }

  // private createRhombus(dimensions: ShapeDimensions): string {
  //   const side = dimensions.side || 1;
  //   const circleRadius = 10;
  //   const rows = Math.floor(side / (2 * circleRadius));
  //   const cols = Math.floor(side / (2 * circleRadius));
  //   const circles = this.generateCircles(rows, cols, circleRadius);

  //   return `
  //     <div style="position: relative; width:${side}px; height:${side}px;">
  //       <svg width="100%" height="100%">
  //         <polygon points="0,${side / 2} ${side / 2},0 ${side},${side / 2} ${
  //     side / 2
  //   },${side}" style="fill: purple; stroke: black; stroke-width: 1;"></polygon>
  //         ${circles}
  //       </svg>
  //     </div>`;
  // }

  // private createTrapezium(dimensions: ShapeDimensions): string {
  //   const topWidth = dimensions.sideTrapeziumTop || 1;
  //   const bottomWidth = dimensions.sideTrapeziumBottom || 1;
  //   const height = dimensions.heightTrapezium || 1;
  //   const circleRadius = 10;
  //   const rows = Math.floor(height / (2 * circleRadius));
  //   const cols = Math.floor(
  //     Math.max(topWidth, bottomWidth) / (2 * circleRadius)
  //   );
  //   const circles = this.generateCircles(rows, cols, circleRadius);

  //   return `
  //     <div style="position: relative; width:${Math.max(
  //       topWidth,
  //       bottomWidth
  //     )}px; height:${height}px;">
  //       <svg width="100%" height="100%">
  //         <polygon points="0,${height} ${topWidth},${height} ${bottomWidth},0 0,0" style="fill: pink; stroke: black; stroke-width: 1;"></polygon>
  //         ${circles}
  //       </svg>
  //     </div>`;
  // }

  // private createHexagon(dimensions: ShapeDimensions): string {
  //   const side = dimensions.side || 1;
  //   const circleRadius = 10;
  //   const rows = Math.floor(side / (2 * circleRadius));
  //   const cols = Math.floor(side / (2 * circleRadius));
  //   const circles = this.generateCircles(rows, cols, circleRadius);

  //   const polygonPoints = this.generatePolygonPoints(6, side);
  //   return `
  //     <div style="position: relative; width:${side * 2}px; height:${
  //     side * 2
  //   }px;">
  //       <svg width="100%" height="100%">
  //         <polygon points="${polygonPoints}" style="fill: blue; stroke: black; stroke-width: 1;"></polygon>
  //         ${circles}
  //       </svg>
  //     </div>`;
  // }

  // private createPolygon(numOfSides: number, side: any): string {
  //   const circleRadius = 10;
  //   const rows = Math.floor(side / (2 * circleRadius));
  //   const cols = Math.floor(side / (2 * circleRadius));
  //   const circles = this.generateCircles(rows, cols, circleRadius);

  //   const polygonPoints = this.generatePolygonPoints(numOfSides, side);
  //   return `
  //     <div style="position: relative; width:${side * 2}px; height:${
  //     side * 2
  //   }px;">
  //       <svg width="100%" height="100%">
  //         <polygon points="${polygonPoints}" style="fill: blue; stroke: black; stroke-width: 1;"></polygon>
  //         ${circles}
  //       </svg>
  //     </div>`;
  // }

  // private generateCircles(
  //   rows: number,
  //   cols: number,
  //   circleRadius: number
  // ): string {
  //   let circles = '';
  //   const offsetX = circleRadius;
  //   const offsetY = circleRadius;

  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < cols; j++) {
  //       const x = offsetX + j * (2 * circleRadius);
  //       const y = offsetY + i * (2 * circleRadius);
  //       circles += `<circle cx="${x}" cy="${y}" r="${circleRadius}" fill="red" (click)="circleClickHandler($event)"></circle>`;
  //     }
  //   }

  //   return circles;
  // }

  private generateCircles(shapeType: ShapeType, dimensions: ShapeDimensions, circleRadius: number): string {
    let circles = '';
    let rows = 0;
    let cols = 0;
  
    // Calculate number of rows and columns based on the shape
    switch (shapeType) {
      case ShapeType.Rectangle:
        const rectWidth = dimensions.width || 1;
        const rectHeight = dimensions.height || 1;
        rows = Math.floor(rectHeight / (2 * circleRadius));
        cols = Math.floor(rectWidth / (2 * circleRadius));
        break;
      case ShapeType.Circle:
        const circleDiameter = (dimensions.radius || 1) * 2;
        rows = Math.floor(circleDiameter / (2 * circleRadius));
        cols = Math.floor(circleDiameter / (2 * circleRadius));
        break;
      case ShapeType.Hexagon:
        const hexSide = dimensions.side || 1;
        rows = Math.floor(hexSide / (2 * circleRadius));
        cols = Math.floor(hexSide / (2 * circleRadius));
        break;
      // Handle other shapes similarly
    }
  
    // Offset to position circles properly within the shape
    const offsetX = circleRadius;
    const offsetY = circleRadius;
  
    // Generate circles at each grid position within the shape
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = offsetX + j * (2 * circleRadius);
        const y = offsetY + i * (2 * circleRadius);
        circles += `<circle cx="${x}" cy="${y}" r="${circleRadius}" fill="red" (click)="circleClickHandler($event)"></circle>`;
      }
    }
  
    return circles;
  }
  

  private generatePolygonPoints(numOfSides: number, side: number): string {
    const angle = (Math.PI * 2) / numOfSides;
    let polygonPoints = '';
    for (let i = 0; i < numOfSides; i++) {
      const x = side + side * Math.cos(i * angle);
      const y = side + side * Math.sin(i * angle);
      polygonPoints += `${x},${y} `;
    }
    return polygonPoints;
  }
}
