import { Observable } from 'rxjs';
import { Store } from './inventory.model';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  storesCollection: AngularFirestoreCollection<Store>;
  stores: Observable<Store[]>;
  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.storesCollection = this.afs.collection('store');
    this.stores = this.storesCollection.valueChanges();

    this.storesCollection.valueChanges().subscribe((data: Store[]) => {
      console.log('data --->', data);
    });
  }

}
