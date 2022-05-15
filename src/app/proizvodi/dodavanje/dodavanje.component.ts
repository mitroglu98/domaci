import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from 'src/app/servisi/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dodavanje',
  templateUrl: './dodavanje.component.html',
  styleUrls: ['./dodavanje.component.css']
})
export class DodavanjeComponent implements OnInit {
  productForm !: FormGroup;
  actionBtn : string = "Save"
  title : string = "Dodaj proizvod"
  constructor(private formBuilder : FormBuilder, private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any, 
    private dialogRef : MatDialogRef<DodavanjeComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name : ['', Validators.required],
      brand : ['', Validators.required],
      price : ['', Validators.required],
      description: ['', Validators.required],
      image_url: ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update"
      this.title = "Edit Product Form" 
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['brand'].setValue(this.editData.brand);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['image_url'].setValue(this.editData.image_url);
      this.productForm.controls['description'].setValue(this.editData.description);
    }

  }

 
  opensweetalertAdd(){
    Swal.fire({
      title:'Product added successfully',
      icon:'success',
      showCancelButton:true,
    })
  }
  opensweetalertAddError(){
    Swal.fire({
      title:'Error while adding product',
      icon:'error',
      showCancelButton:true,
    })

  }
  opensweetalertEdit(){
    Swal.fire({
      title:'Product updated successfully',
      icon:'success',
      showCancelButton:true,
    })
  }
  opensweetalertEditError(){
    Swal.fire({
      title:'Error while updating the record!',
      icon:'error',
      showCancelButton:true,
    })

  }

  dodajProizvod(){

    if(!this.editData){  
      if(this.productForm.valid){

        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            this.opensweetalertAdd();
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            this.opensweetalertAddError();
          }

        })
      }
    }else{
      this.updateProduct()
    }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        this.opensweetalertEdit();
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        this.opensweetalertEditError();
      }
      
    })
  }

}
