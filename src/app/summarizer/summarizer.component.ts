import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-summarizer',
  templateUrl: './summarizer.component.html',
  styleUrls: ['./summarizer.component.css']
})
export class SummarizerComponent {
  inputText: string = '';
  summary: string | null = null;

  constructor(private http: HttpClient) {}

  summarize() {
    const payload = { text: this.inputText };
    this.http.post<any>('http://your-ec2-public-dns:5000/summarize', payload)
      .subscribe(response => {
        this.summary = response.summary;
      }, error => {
        console.error('Error:', error);
      });
  }
}