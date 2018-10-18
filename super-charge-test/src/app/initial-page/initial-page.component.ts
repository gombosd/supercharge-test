import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GameActions, StartGame } from '../store/actions';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css'],
})
export class InitialPageComponent implements OnInit {
  deckSizeForm: FormGroup;
  stackSizes: number[] = [3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private fb: FormBuilder, private store: Store<any>) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  startGame(formState: any) {
    this.store.dispatch(new StartGame({ deckSize: formState.value.size }));
  }

  private createFormGroup(): FormGroup {
    return (this.deckSizeForm = this.fb.group({
      size: 3,
    }));
  }
}
