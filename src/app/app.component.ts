import { Component, OnInit } from "@angular/core";

import { Chart } from "chart.js/auto";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public chart: Chart;
  ngOnInit() {
    this.chart = new Chart("canvas", {
      type: "scatter",
      data: this._getAnomaliesData(),
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right'
          }
        }
      }
    });
  }

  private _getRandomNumber(min: number, max: number): number {
    return Math.trunc(Math.random() * (max + 1 - min) + min);
  }

  private _getAnomaliesData() {
    const data = [];
    for (let i = 0; i < 1000; i++) {
      data.push({x: this._getRandomNumber(20, 30), y: this._getRandomNumber(-10, 0)});
    }

    const anomalies = {
      labels: [
        "NIC anomalies"
      ],
      datasets: [
        {
          label: "H - Transponder...",
          data,
          borderWidth: 1,
          backgroundColor: "#407ab3"
        }
      ],
    };

    return anomalies;
  }
}
