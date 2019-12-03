import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "fitapp-dialog-error",
  templateUrl: "./dialog-error.component.html",
  styles: []
})
export class DialogErrorComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  public closeDialog = () => {
    this.dialogRef.close();
  };
}
