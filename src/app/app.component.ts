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
      type: "bar",
      data: this._getCnsCapData(),
      options: {
        animation: false,
        plugins: {
          legend: {
            display: true
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

  private _getCnsCapData() {
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
        "Cap1", "Cap2", "Cap3"
      ],
      datasets: [{
        label: 'Total',
        data: [10,15,13],
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderWidth: 1
      },{
        label: '0-5',
        data: [9,13,11],
        backgroundColor: 'rgba(250,150,0,0.6)',
        borderWidth: 1
      },{
        label: '21-25',
        data: [3,4,2],
        backgroundColor: 'rgba(100,150,200,0.6)',
        borderWidth: 1
      }]
      ,
    };

    return anomalies;
  }
}
