import { Component, OnInit, viewChild, ElementRef, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';
import { AsistenciasService } from '../../../infrastructure/services/asistencias.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-total-asistentes-por-actividades',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './total-asistentes-por-actividades.component.html',
  styleUrl: './total-asistentes-por-actividades.component.css'
})
export class TotalAsistentesPorActividadesComponent implements OnInit {

  chartOptions: ChartOptions = {
   series: [],
  chart: {
    type: 'bar',
    height: 350
  },
  xaxis: {
    categories: []
  },
  title: {
    text: 'Cargando gráfico...' // Asegura que NO es undefined
  }
};
  constructor( private asistenciaService: AsistenciasService){}

  ngOnInit(): void {
      this.asistenciaService.obtenerTotalesPorActividades().subscribe(data => {
        const actividades = data.map(item => item.actividad);
      const totales = data.map(item => item.totalAsistentes);

      this.chartOptions.series = [
      {
        name: 'Asistentes',
        data: totales
      }
    ];
    this.chartOptions.xaxis = {
      categories: actividades
    };
    this.chartOptions.title = {
      text: 'Total de asistentes por actividad'
    };
  });
  }

}
