import { Observable, Subscription } from 'rxjs';
import { initialNotes } from './notes.fixture';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from './notes.service';
import { NewNote, Note } from './note';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  selected?: Note | NewNote;
  notesList: Note[];
   constructor(private readonly notesService: NotesService) { }
  public serviceSubscription: Subscription;

  ngOnInit() {
     this.serviceSubscription = this.notesService.notes$.subscribe(notes => {
      this.notesList = notes;
     });

  }
  selectNote(note) {
    const index = this.notesList.findIndex(currentNote => currentNote.id === note.id);
    return this.selected = this.notesList[index];

  }

  newNote() {
    this.selected = createNewNote();
  }

  saveNote(note: Note) {
    this.notesService.saveNote(note).subscribe(newData => {
      console.log('New', newData);
    });
  }
  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}

function createNewNote(): NewNote {
  return { title: '', body: '', color: '', favorite: false };
}
