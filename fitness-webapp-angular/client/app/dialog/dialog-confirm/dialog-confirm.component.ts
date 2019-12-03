import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "fitapp-dialog-confirm",
  templateUrl: "./dialog-confirm.component.html",
  styles: []
})
export class DialogConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  public closeDialog(confirmed: boolean) {
    this.dialogRef.close(confirmed);
  }
}
