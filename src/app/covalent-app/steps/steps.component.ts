import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps',
  template: `
    <td-steps (stepChange)="change($event)" mode="'vertical'">
      <td-step #step label="Label" 
              sublabel="Sublabel" 
              [active]="active" 
              [disabled]="disabled" 
              [state]="state" 
              (activated)="activeEvent()" 
              (deactivated)="deactiveEvent()">
        <ng-template td-step-label>
          ... add label content (if not used, falls back to [label] input)
        </ng-template>
        ... add content that will be shown when the step is "active"
        <ng-template td-step-actions>
          <button (click)="step.close()">Close</button>
          ... add button elements for the step content (optional)
        </ng-template>
        <ng-template td-step-summary>
          ... add summary that will be shown when step in is "complete" state (optional)
        </ng-template>
      </td-step>
    </td-steps>
  `,
  styles: []
})
export class StepsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
