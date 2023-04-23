import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  loaded: boolean = false;
  tab: string = '';
  tabs: { title: string; }[] = [
    {
      title: 'entry'
    },
    {
      title: 'select'
    }
  ];
  selection!: string;

  constructor (
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.queryParams.subscribe(params => {
      if (params['activeTab']) {
        this.tab = params['activeTab'];
      }
    })
  }

  ngOnInit(): void {
    this.loaded = true;
    if (sessionStorage.getItem('entryTab')) {
      //@ts-ignore
      this.tab = sessionStorage.getItem('entryTab');

    } else {
      this.tab = 'entry';
      sessionStorage.setItem('entryTab', this.tab);
    }
  }

  changeTab(tab: string) {
    this.tab = tab;
    sessionStorage.setItem('entryTab', tab);
  }

  select(selected: string) {
    this.selection = selected;
  }

}
