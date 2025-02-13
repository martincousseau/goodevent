import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    console.log('registerForm : ', this.registerForm);
    // Initialisation du formulaire avec les champs et leurs validations
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Accéder aux contrôles du formulaire
  get f() {
    return this.registerForm.controls;
  }

  // Soumission du formulaire
  onSubmit() {
    this.submitted = true;

    // Si le formulaire est invalide, on arrête l'exécution
    if (this.registerForm.invalid) {
      return;
    }

    // Ici, tu peux envoyer les données au backend ou effectuer une autre action
    console.log('Formulaire soumis', this.registerForm.value);

    // Rediriger l'utilisateur après une inscription réussie (par exemple vers la page de connexion)
    this.router.navigate(['/login']);
  }
}
