import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private metaTagService: Meta,private titleService: Title) { }

  createMeta(index:boolean,title:string,description:string){
    this.metaTagService.removeTag('name="description"');
    this.metaTagService.removeTag('name="robots"');
    this.metaTagService.addTags([
      { name: 'robots', content: index ? 'index, follow' : 'noindex, nofollow' },
      { name: 'description', content: description }
    ]);
    this.metaTagService.updateTag(
      { name: 'description', content: description }
    );
    this.metaTagService.updateTag(
      { name: 'robots', content: index ? 'index, follow' : 'noindex, nofollow' }
    );
    this.titleService.setTitle(title);
  }
}
