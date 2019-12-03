import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "fitapp-dialog-success",
  templateUrl: "./dialog-success.component.html",
  styles: []
})
export class DialogSuccessComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  public closeDialog = () => {
    this.dialogRef.close();
  };
}
