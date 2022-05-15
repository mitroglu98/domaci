import { Component, OnInit,ViewChild  } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../servisi/api.service';
import { DodavanjeComponent } from './dodavanje/dodavanje.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proizvodi',
  templateUrl: './proizvodi.component.html',
  styleUrls: ['./proizvodi.component.css']
})
export class ProizvodiComponent implements OnInit {

  displayedColumns: string[] = ['name', 'brand', 'price', 'description', 'image_url','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private servis: ApiService, private addProduct: MatDialog) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllProducts(){
    this.servis.getProduct()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        //paginacija
        this.dataSource.paginator = this.paginator
        //sortiranje
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert('Error while fetching the Records!')
      }
    })
  }
  DodajProizvod() {
    this.addProduct.open(DodavanjeComponent, {
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts();  
      }
    })
  }

   //Editovanje
   editProduct(row: any){
    this.addProduct.open(DodavanjeComponent,{
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllProducts();
      }
    })
    
  }
  opensweetalertDelete(){
    Swal.fire({
      title:'Product Deleted Successfully',
      icon:'success',
      showCancelButton:true,
    })

  }
  opensweetalertDeleteError(){
    Swal.fire({
      title:'Error while deleting the product!',
      icon:'error',
      showCancelButton:true,
    })

  }

  deleteProduct(id:number){
    this.servis.deleteProduct(id)
    .subscribe({
      next:(res) =>{
        this.opensweetalertDelete();
        this.getAllProducts();
      },
      error:()=>{
        this.opensweetalertDeleteError();
      }
    })
  }


}
