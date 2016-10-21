import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FormComponent } from "../shared/forms";
import { IdentityService } from "../shared/identity/identity.service";
import { validateEmail } from "../shared/forms/validators";

@Component({
  selector: 'app-identify',
  templateUrl: './identify.component.html',
  styleUrls: ['./identify.component.css']
})
export class IdentifyComponent extends FormComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private identity: IdentityService,
  ) {
      super();
    }

  ngOnInit() {
    if (this.identity.isIdentified()) {
      this.router.navigate(['/']);
    }
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, validateEmail]],
    });
    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  identify(): void {
    this.identity.identity = this.formData;
    this.router.navigate(['/']);
  }

}
