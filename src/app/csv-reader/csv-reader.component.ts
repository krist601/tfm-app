import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-csv-reader',
  templateUrl: './csv-reader.component.html',
  styleUrls: ['./csv-reader.component.css']
})
export class CsvReaderComponent implements OnInit {
  public csvData: { title: string, summary: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCSV();
  }

  loadCSV() {
    const csvUrl = 'https://complu-bucket.s3.eu-north-1.amazonaws.com/summaries/news_summaries_2024_08_23__14_45_40.csv';

    this.http.get(csvUrl, { responseType: 'text' }).subscribe(
      data => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            // Filter out rows where "summary" is empty, then map to only "title" and "summary"
            this.csvData = result.data
              .filter((row: any) => row.summary && row.summary.trim() !== '')
              .map((row: any) => ({
                title: row.title,
                summary: row.summary
              }));
          }
        });
      },
      error => {
        console.error('Error loading the CSV file:', error);
      }
    );
  }
}
