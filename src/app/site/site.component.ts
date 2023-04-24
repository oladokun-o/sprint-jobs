import { Component, OnInit } from '@angular/core';
import { EntryService } from '../core/services/entry/entry.service';
import { User, UserData } from '../core/interfaces/user.interface';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  users: User[] = [];
  constructor (
    public entryService: EntryService
  ) { }

  ngOnInit(): void {
    this.entryService.getUsers('earn').subscribe((users: UserData) => {
      this.users = users.data;
    });
  }

}
