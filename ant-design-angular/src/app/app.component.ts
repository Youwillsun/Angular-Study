import { Component, OnInit } from '@angular/core';
import getISOWeek from 'date-fns/getISOWeek';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public size: number = 8;
  public isCollapsed = false;
  public date = null;
  public style = {
    float: 'left',
    height: '300px',
    marginLeft: '70px'
  };

  public marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50'
      },
      label: '<strong>100°C</strong>'
    }
  };

  switchValue = false;
  loading = false;

  constructor() { }

  ngOnInit() {

  }


  // 折叠面板
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // 日期改变选择
  onChange(result: Date[]): void {
    console.log('onChange: ', result);
  }
  // 日期获取
  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  clickSwitch(): void {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.switchValue = !this.switchValue;
        this.loading = false;
      }, 3000);
    }
  }
}
