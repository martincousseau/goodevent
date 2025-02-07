import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // Formulaire réactif
  submitted = false; // Suivi de la soumission du formulaire

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    // Initialisation du formulaire avec les champs et leurs validations
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]], // Email
        firstName: ['', Validators.required], // Prénom
        lastName: ['', Validators.required], // Nom
        username: ['', [Validators.required, Validators.minLength(3)]], // Nom d'utilisateur
        birthDate: ['', Validators.required], // Date de naissance
        password: ['', [Validators.required, Validators.minLength(6)]], // Mot de passe
        confirmPassword: ['', Validators.required], // Confirmation du mot de passe
      },
      {
        validator: this.passwordMatchValidator, // Valide que les mots de passe sont identiques
      }
    );
  }

  // Validateur pour vérifier si les mots de passe correspondent
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
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
