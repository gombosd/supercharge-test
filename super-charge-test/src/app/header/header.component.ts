import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StartGame } from '../store/actions';
import { RoutesRecognized, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  deckSizeForm: FormGroup;
  hasSearchBar: Observable<boolean>;
  superchargeIcon = '../../assets/images/supercharge-logo.svg';
  stackSizes: number[] = [3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setSearchbar();
    this.createFormGroup();
  }

  startGame(formState: any) {
    this.store.dispatch(new StartGame({ deckSize: formState.value.size }));
  }

  private setSearchbar(): void {
    this.router.events.subscribe(data => {
      if (data instanceof RoutesRecognized) {
        this.hasSearchBar = data.state.root.firstChild.data.hasSearchBar;
      }
    });
  }

  private createFormGroup(): FormGroup {
    return (this.deckSizeForm = this.fb.group({
      size: 3,
    }));
  }
}
