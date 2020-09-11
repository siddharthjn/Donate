import { switchMap, map } from "rxjs/operators";
import { Book } from "./books.model";
import { Inventory } from "./inventory.model";
import { Observable, of, combineLatest } from "rxjs";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.css"],
})
export class InventoryComponent implements OnInit {
  inventory$: Observable<Inventory[]> = this.afs
    .collection("inventory")
    .valueChanges() as Observable<Inventory[]>;
  bookInv: Book[];
  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
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
              return this.afs
                .collection<Book>("books", (ref) =>
                  ref.where("id", "==", bookId)
                )
                .valueChanges()
                .pipe(map((books) => books[0]));
            })
          );
        })
      )
      .subscribe((books) => {
        this.bookInv = books;
      });
  }
}
