import { Component, OnInit } from "@angular/core";

import { Chart } from "chart.js/auto";

const uc2_c2 = {
  labels: [
    "AIRBUS INDUSTRIE A319 A319 NEO",
    "AIRBUS INDUSTRIE A320 A320 NEO",
    "AIRBUS INDUSTRIE A321 A321 NEO",
    "AIRBUS INDUSTRIE A330 A330 NEO",
  ],
  datasets: [
    {
      label: "H - Transponder...",
      data: [0, 4006, 2098, 1],
      borderWidth: 1,
      backgroundColor: "#407ab3"
    }
  ],
};

const uc2_c3 = {
  labels: [
    "AIRBUS INDUSTRIE A319",
    "AIRBUS INDUSTRIE A320",
    "AIRBUS INDUSTRIE A321",
    "AIRBUS INDUSTRIE A330",
  ],
  datasets: [
    {
      label: "H - Transponder...",
      data: [0, 8000, 10000, 2000],
      borderWidth: 1,
      backgroundColor: "#407ab3"
    }
  ],
};

const uc2_c4 = {
  labels: [
    "AIRBUS INDUSTRIE"
  ],
  datasets: [
    {
      label: "H - Transponder...",
      data: [32500],
      borderWidth: 1,
      backgroundColor: "#407ab3"
    }
  ],
};

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public chart: Chart;
  ngOnInit() {
    this.chart = new Chart("canvas", {
      type: "bar",
      data: uc2_c3,
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
}
