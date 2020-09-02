import { switchMap, map } from "rxjs/operators";
import { Book } from "./books.model";
import { Inventory } from "./inventory.model";
import { Observable, of, combineLatest } from "rxjs";
import { Store } from "./store.model";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.css"],
})
export class InventoryComponent implements OnInit {
  storesCollection: AngularFirestoreCollection<Store>;
  stores: Observable<Store[]>;
  inventory$: Observable<Inventory[]>;
  books: Observable<Book[]>;
  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.storesCollection = this.afs.collection("store");
    this.stores = this.storesCollection.valueChanges();

    const invCollection: AngularFirestoreCollection<Inventory> = this.afs.collection(
      "inventory"
    );
    this.inventory$ = invCollection.valueChanges();

    this.inventory$
      .pipe(
        map((inv) => {
          let bookInv = inv.filter((item) => item.type === "book");
          const bookIds = bookInv.map((item) => item.itemId);
          return bookIds;
        }),
        switchMap((bookIds: string[]) => {
          return combineLatest(
            bookIds.map((bookId) => {
              console.log("item searching for --->", bookId);
              return this.afs
                .collection<Book>("books", (ref) =>
                  ref.where("id", "==", bookId)
                )
                .valueChanges();
            })
          );
        })
      )
      .subscribe((books) => console.log("books bay!!!!!!!", books));

    this.storesCollection.valueChanges().subscribe((data: Store[]) => {
      console.log("data --->", data);
    });

    // booksCollection.valueChanges().subscribe((data: Book[]) => {
    //   console.log("data --->", data);
    // });

    //   return itemIds.map((itemId) => {
    //     console.log("item searching for --->", itemId);
    //     return this.afs
    //       .collection<Book>("books", (ref) => ref.where("id", "==", itemId))
    //       .valueChanges();
    // }
  }
}
