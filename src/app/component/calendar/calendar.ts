import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MbscCalendarEvent,
  MbscDateType,
  MbscEventcalendar,
  MbscEventcalendarView,
  MbscEventClickEvent,
  MbscEventCreatedEvent,
  MbscModule,
  MbscPopup,
  MbscPopupButton,
  MbscPopupOptions,
  MbscResponsiveOptions,
  Notifications,
} from '@mobiscroll/angular';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, MbscModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {

  constructor(private router: Router, private notify: Notifications) { }

  ngOnInit() {
    const storedEvents = localStorage.getItem('event-title');
    if (storedEvents) {
      this.myEvents = JSON.parse(storedEvents).map((event: any) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
        
      }));
    }
  }

  formattedDate: string = ''

  @ViewChild('calendar', { static: false })
  calendar!: MbscEventcalendar;

  @ViewChild('addEditPopup', { static: false })
  addEditPopup!: MbscPopup;

  @ViewChild('colorPicker', { static: false })
  colorPicker!: MbscPopup;


  eventId: string | number | undefined;
  eventTitle: string | undefined;
  eventDescription = '';
  eventAllDay = false;
  eventDates: MbscDateType[] = [];
  eventBuffer = 0;
  eventColor = '';
  eventStatus = false;

  selectedColor = '';
  statusValue = 'busy';
  editedEvent: MbscCalendarEvent | null = null;
  addEditPopupAnchor: HTMLElement | undefined;
  colorPickerAnchor: HTMLElement | undefined;
  isEdit = false;
  isSuccess = false;
  clickTimeOut: any = null
  isEventClick: boolean = false

  myView: MbscEventcalendarView = { calendar: { labels: true,type:'month' } };

  colors: string[] = ['#ffeb3c', '#ff9900', '#f44437', '#ea1e63', '#9c26b0', '#3f51b5', '#009788', '#4baf4f', '#7e5d4e'];

  myEvents: MbscCalendarEvent[] = [];

  saveEventTitle() {
    localStorage.setItem('event-title', JSON.stringify(this.myEvents))
    console.log("set", this.myEvents);
  }


  editButtons: (MbscPopupButton | "ok" | "close" | "set" | "cancel")[] = [
    'cancel',
    {
      text: 'Delete',
      cssClass: 'custom-delete-button',
      handler: () => this.handleDeleteButtonClick(),
    },
    {
      text: 'Save',
      keyCode: 'enter',
      cssClass: 'mbsc-popup-button-primary',
      handler: () => {
        const updatedEvent: MbscCalendarEvent = this.getEventData();
        const index = this.myEvents.findIndex((x) => x.id === updatedEvent.id);
        const newEventList = [...this.myEvents];

        // Update event in the list
        if (index > -1) {
          newEventList.splice(index, 1, updatedEvent);
        } else {
          newEventList.push(updatedEvent);
        }
        this.myEvents = newEventList;
        this.saveEventTitle();
        this.calendar.navigateToEvent(updatedEvent);
        this.addEditPopup.close();
      },
    },
  ];

  addButtons: (MbscPopupButton | "ok" | "close" | "set" | "cancel")[] = [
    'cancel',
    {
      text: 'Add',
      keyCode: 'enter',
      cssClass: 'mbsc-popup-button-primary',
      color: 'primary',
      handler: () => {
        const newEvent: MbscCalendarEvent = this.getEventData();

        // Add new event to the list
        this.myEvents = [...this.myEvents, newEvent];
        // console.log("newEvent",newEvent);
        this.saveEventTitle()
        this.isSuccess = true;
        this.calendar.navigateToEvent(newEvent);
        this.addEditPopup.close();
      },
    },
  ]

  addEditPopupResponsive: MbscResponsiveOptions<MbscPopupOptions> = {
    medium: {
      display: 'anchored',
      width: 400,
      fullScreen: false,
      touchUi: false,
    }
  }

  colorPickerButtons: (MbscPopupButton | "ok" | "close" | "set" | "cancel")[] = [
    'cancel',
    {
      text: 'Set',
      keyCode: 'enter',
      handler: () => this.applySelectedColor(this.selectedColor),
      cssClass: 'mbsc-popup-button-primary',
    },
  ];

  colorPickerResponsive: MbscResponsiveOptions<MbscPopupOptions> = {
    medium: {
      display: 'anchored',
      buttons: [],
      touchUi: false,
    },
  };

  fillPopup(event: MbscCalendarEvent): void {
    this.eventId = event.id;
    this.eventTitle = event.title || '';
    this.eventDescription = event['description'] || '';
    this.eventAllDay = event.allDay!;
    this.eventDates = [event.start!, event.end!];
    this.eventBuffer = event.bufferBefore || 0;
    this.eventColor = event.color || '';
    this.eventStatus = event['free'] || false;
    this.statusValue = event['free'] ? 'free' : 'busy';
  }

  createEditPopup(event: MbscCalendarEvent, target: HTMLElement): void {
    this.isEdit = true;
    this.editedEvent = event;
    this.addEditPopupAnchor = target;
    this.fillPopup(event);
    this.addEditPopup.open();
  }

  createAddPopup(event: MbscCalendarEvent, target: HTMLElement): void {
    this.isSuccess = false;
    this.isEdit = false;
    this.editedEvent = event;
    this.addEditPopupAnchor = target;
    this.fillPopup(event);
    this.addEditPopup.open();
  }

  getEventData(): (MbscCalendarEvent) {
    return {
      id: this.eventId,
      title: this.eventTitle,
      description: this.eventDescription,
      allDay: this.eventAllDay,
      start: this.eventDates[0],
      end: this.eventDates[1],
      bufferBefore: this.eventBuffer,
      color: this.eventColor,
      free: this.statusValue === 'free',
    }
  }

  handleAddEditPopupClose(): void {
    if (!this.isEdit && !this.isSuccess) {
      this.myEvents = [...this.myEvents];
    }
  }

  handleEventClick(args: MbscEventClickEvent): void {
    this.isEventClick = true
    if (this.clickTimeOut) {
      clearTimeout(this.clickTimeOut);
      this.clickTimeOut = null
    }
    this.createEditPopup(args.event, args.domEvent.currentTarget);
    setTimeout(() => {
      this.isEventClick = false;
    });
  }

  handleEventCreated(args: MbscEventCreatedEvent): void {

    if (this.clickTimeOut) {
      clearTimeout(this.clickTimeOut);
      this.clickTimeOut = null
    }

    setTimeout(() => {
      this.createAddPopup(args.event, args.target!);

    });
  }

  handleEventDeleted(args: any) {
    const deletedEvent = args?.event || this.editedEvent;
    if (!deletedEvent) {
      return;
    }

    this.myEvents = this.myEvents.filter((e) => e.id !== deletedEvent.id);
    this.saveEventTitle();

    this.notify.snackbar({
      button: {
        action: () => {
          this.myEvents = [...this.myEvents, deletedEvent];
          this.saveEventTitle();
        },
        text: 'Undo',
      },
      message: 'Event deleted',
    });
  }

  handleDeleteButtonClick() {
    if (!this.editedEvent) return;

    const deletedEvent = this.editedEvent;
    this.myEvents = this.myEvents.filter((e) => e.id !== deletedEvent.id);
    this.saveEventTitle();
    this.addEditPopup.close();

    this.notify.snackbar({
      message: 'Event deleted',
      button: {
        text: 'Undo',
        action: () => {
          this.myEvents = [...this.myEvents, deletedEvent];
          this.saveEventTitle();
        }
      },
    });
  }


  handleEventColorClick(ev: MouseEvent): void {
    console.log("event", ev);

    this.colorPickerAnchor = ev.currentTarget as HTMLElement;
    this.colorPicker.open();
  }

  handleColorChange(color: string): void {
    this.eventColor = color;
    this.selectedColor = color;
    if (!this.colorPicker.s.buttons!.length) {
      this.applySelectedColor(color);
    }
  }

  applySelectedColor(color: string): void {
    this.eventColor = color;
    this.colorPicker.close();
  }

  onDateChange(event: any) {

    if (this.isEventClick) {
      return;
    }

    if (this.clickTimeOut) {
      clearTimeout(this.clickTimeOut);
    }

    this.clickTimeOut = setTimeout(() => {
      const selectedDate = event.date
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = selectedDate.toLocaleDateString('en-GB', { month: 'short' });
      const year = selectedDate.getFullYear();

      this.formattedDate = `${day}-${month}-${year}`;

      this.router.navigate(['/history', this.formattedDate])
      this.clickTimeOut = null;

    }, 250)
  }

}
