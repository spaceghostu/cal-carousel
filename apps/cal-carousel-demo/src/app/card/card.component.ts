import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('borderAnimation', [
      state('true', style({ borderBottomWidth: '10px' })),
      state('false', style({ borderBottomWidth: '0px' })),
      transition('* => *', animate('500ms cubic-bezier(0.41, 0, 0.22, 0.79)')),
    ]),
    trigger('actionAnimation', [
      state('true', style({ opacity: '1', transform: 'translateY(0px)' })),
      state('false', style({ opacity: '0', transform: 'translateY(50px)' })),
      transition('* => *', animate('500ms cubic-bezier(0.41, 0, 0.22, 0.79)')),
    ])
  ]
})
export class CardComponent {

  @Input() title = '';
  @Input() icon = '';

  @Input() active = false;

}
