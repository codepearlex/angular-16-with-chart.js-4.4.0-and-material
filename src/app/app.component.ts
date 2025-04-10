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
    const data = this._getCWPHistogramData();
    this.chart = new Chart("canvas", {
      type: "bar",
      data: data.data,
      options: {
        animation: false,
        plugins: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: 'Application Lifetime: '+data.lifetime
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Cache updates'
            }
          },
          y: {
            title: {
              display: true,
              text: '# Targets'
            }
          }
        }
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

  private _getCWPHistogramData() {
    const appLifetime = `22m`;
    const inputData = [[1,1912],[7,131],[3,314],[13,58],[8,176],[16,69],[6,218],[11,67],[12,92],[2,1196],[14,70],[4,356],[17,31],[22,38],[5,198],[9,98],[52,8],[10,124],[23,21],[35,10],[15,51],[20,48],[18,54],[19,21],[25,15],[33,10],[38,15],[56,7],[49,6],[21,30],[27,8],[36,9],[44,10],[58,9],[53,6],[71,1],[29,16],[30,18],[39,11],[26,24],[28,18],[42,15],[34,12],[24,28],[68,4],[31,9],[62,9],[45,9],[67,2],[69,4],[37,6],[32,17],[41,6],[46,14],[60,7],[64,4],[48,9],[57,3],[59,4],[54,8],[43,5],[40,13],[47,4],[85,1],[86,1],[76,4],[55,6],[72,9],[75,2],[63,5],[82,5],[73,2],[74,4],[78,2],[87,1],[65,2],[61,1],[70,10],[101,1],[99,1],[50,8],[66,4],[51,4],[81,2],[79,1],[80,1]];

    const sorted = inputData.sort((a, b) => a[0] - b[0]).filter(v => v[0] > 1);

    const data = {
      labels: sorted.map(v => v[0]),
      datasets: [{
        label: 'Targets',
        data: sorted.map(v => v[1]),
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderWidth: 1
      }]
      ,
    };

    return {lifetime: appLifetime, data};
  }
}
