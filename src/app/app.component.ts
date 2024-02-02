import { Component, OnInit } from "@angular/core";

import { Chart } from "chart.js/auto";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public chart: Chart;
  private _colors = ['#ff0000', '#00ff00', '#0000ff'];
  ngOnInit() {
    this.chart = new Chart("canvas", {
      type: "scatter",
      data: this._getAnomaliesData(),
      options: {
        animation: false,
        plugins: {
          legend: {
            display: false
          }
        },
      }
    });
  }

  private _getRandomNumber(min: number, max: number): number {
    return Math.trunc(Math.random() * (max + 1 - min) + min);
  }

  private _getRandomColor(): string {
    return this._colors[this._getRandomNumber(0, 2)];
  }

  private _getAnomaliesData() {
    const data = [];
    for (let i = 0; i < 20000; i++) {
      data.push({
        x: this._getRandomNumber(0, 1000),
        y: this._getRandomNumber(0, 1000),
        color: this._getRandomColor()
      });
    }

    const colors: Map<string, any[]> = new Map<string, any[]>();
    data.forEach(point => {
      if (!colors.has(point.color)) {
        colors.set(point.color, []);
      }
      const a = colors.get(point.color);
      a.push({x: point.x,  y: point.y});
    })

    console.log('data', data);

    const anomalies = {
      labels: [
        "NIC anomalies"
      ],
      datasets: Array.from(colors.keys()).map(key => ({
        label: "H - Transponder...",
        data: colors.get(key),
        pointBackgroundColor: key,
        borderWidth: 1
      }))
      ,
    };

    return anomalies;
  }
}
