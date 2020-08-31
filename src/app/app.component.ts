import { Component, TemplateRef, ViewChild, ElementRef, Inject, Injectable, OnInit  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SESSION_STORAGE, StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';

const STORAGE_KEY = 'note-making';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
  modalRef: BsModalRef;
  aboutModalRef: BsModalRef;
  lookingempty:boolean;
  title = 'noteapp';
  allnotes = [{title: 'Random title', description: 'Random Description'},
  {title: 'Movies to Watch', description: 'Card titles are used by adding .card-title to a <h*> tag. In the same way, links are added and placed next to each other by adding .card-link to an <a> tag.Subtitles are used by adding a .card-subtitle to a <h*> tag. If the .card-title'},
  {title: 'College To Do', description: '1. Buy Books 2. Buy Pens'},
  {title: 'Startup Idea', description: 'Slippers that Float. Call them floaters.'}
];

  // onNoteAdded(noteData:{noteTitle:string, noteDesc:string}) {
  //   this.allnotes.push({
  //     title: noteData.noteTitle,
  //     description: noteData.noteDesc
  //   });
  // }

  checkEmpty(){
    if(this.allnotes.length==0 || this.allnotes==null){
      this.lookingempty=true;
    }
    else{
      this.lookingempty=false;
    }
  }

  onAddNote(noteTitleInput: HTMLInputElement, noteDescriptionInput: HTMLInputElement) {
    
    //  console.log("Pushing");

    this.allnotes.push({
      title: noteTitleInput.value, 
      description: noteDescriptionInput.value});

      this.modalRef.hide();

      this.storage.set(STORAGE_KEY, this.allnotes);
      this.checkEmpty();
      }

  onNoteDeleted(noteData:{title:string, description:string}){
    var i;
    for(i=0; i<this.allnotes.length; i++){
      if(this.allnotes[i].title==noteData.title && this.allnotes[i].description== noteData.description){
        this.allnotes.splice(i,1);
      }
    }
    this.storage.set(STORAGE_KEY, this.allnotes);
    this.checkEmpty();

  }

  constructor(private modalService: BsModalService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
    ) {}
  ngOnInit(): void {

    this.allnotes= this.storage.get(STORAGE_KEY);
    if(this.allnotes==null){
      this.allnotes=[];
    }
  
    // console.log("ALL NOTES CONTENTS: " + JSON.stringify(this.allnotes));
    this.checkEmpty();

    // console.log("Empty? " + this.lookingempty);

  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openAboutModal(abouttemplate: TemplateRef<any>) {
    this.aboutModalRef = this.modalService.show(abouttemplate);
  }
}
