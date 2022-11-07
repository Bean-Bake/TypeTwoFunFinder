import { Component, Renderer2, OnInit, SimpleChanges, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BackEndService } from '../back-end.service';
import { Location } from '../location';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchInput: string = "";
  searchResponse: Location[] = [];
  @ViewChild('input') input!: ElementRef;
  @ViewChildren('response') response!: QueryList<ElementRef>;
  searchFocus: boolean = false;
  searchResponded: boolean = false;


  constructor(private backend: BackEndService,
              private renderer: Renderer2,
              private router: Router)
               { 
                  this.renderer.listen('window', 'click', (e:Event) => {

                    let responseTouched: boolean = false;
                    this.response.forEach(element => {
                      if (e.target === element.nativeElement)
                      {
                        responseTouched = true;
                      }
                    });

                    let inputTouched: boolean = false;
                    if (e.target === this.input.nativeElement)
                    {
                      inputTouched = true;
                    }

                    if (!inputTouched && !responseTouched)
                    {
                      this.resetSearchBar();
                    }
                  });
               }

  ngOnInit(): void 
  {

  }

  ngOnChanges(changes: SimpleChanges)
  {
  }

  searchDatabase(query: string)
  {
    if (query.length < 1)
    {
      this.searchResponse = [];
      this.searchResponded = false;
    }
    else
    {
      if (this.searchResponded === false)
      {
        this.searchForPhrase(query);
        this.searchResponded = true;
      }
      else
      {
        this.searchResponse = this.searchResponse.filter((location: Location) => {
          return (location.name?.toLowerCase().includes(query.toLowerCase()));
        });   
      };
      
    }
  }

  includesPhrase(location: Location)
  {
    const phrase: string = this.searchInput;
    if (location.name!.includes(phrase))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  searchForPhrase(query: string)
  {
    this.backend.searchPhrase(query)
      .subscribe(response => 
        {
          this.searchResponse = JSON.parse(JSON.stringify(response)).data.locations;
        });
  }

  searchFocused()
  {
    this.searchFocus = true;
  }

  resetSearchBar()
  {
    this.searchInput = "";
    this.searchResponse = [];
    this.searchFocus = false;
    this.searchResponded = false;
  }
}