import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/Admin/Service/product.service';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/Services/cart.service';

declare var paypal: any;

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css'],
})
export class AddToCartComponent implements OnInit {
  public products: Product[] = [];
  public grandTotal!: number;
  public Total!: number;

  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  paidFor: boolean = false;

  paymentHandler: any = null;

  constructor(
    private cartService: CartService,
    public toastr: ToastrService,
    public prodService: ProductService
  ) {
    console.log('paypal : ', paypal);
    console.log('paymentHandler : ', this.paymentHandler);
  }

  ngOnInit(): void {
    this.invokeStripe();

    this.cartService.getProducts().subscribe((res: Product[]) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      this.Total = Math.round(this.grandTotal);
    });

    // Paypal
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: this.Total,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          // console.log(order);
          alert('Your Transcation Completed Successfully, Thank You!!! ');
          this.toastr.success(
            'Your Transcation Completed Successfully, Thank You!!!',
            'Paypal Transcation'
          );
        },
        onError: (err: any) => {
          alert(err);
          this.toastr.error(`${err}`);
        },
      })
      .render(this.paypalElement.nativeElement);
  }

  removeItem(item: Product, i: number): void {
    this.cartService.removeCartItem(item, i);
    this.toastr.success(`"${item.title}" Removed Successfully!!!`);
  }
  emptycart(): void {
    this.cartService.removeAllCart();
    this.toastr.success('All Products Removed Successfully!!!');
  }
  // Stripe
  makePayment(amount: number): void {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51K53OqSJvAkMkLDLOQH1kcPer7DqBoan1FKVLDZ19JBWo1zxItMOcXC5ZDwGCdgjZoCkit6adLpz6LUxbZuO0ZQz00rz8VWrvl',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log('stripeToken makePay : ', stripeToken);
        alert('Stripe token generated!');
        this.toastr.success('Stripe token generated!');
      },
    });

    paymentHandler.open({
      name: 'TestStore',
      description: 'E-Commerce',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51K53OqSJvAkMkLDLOQH1kcPer7DqBoan1FKVLDZ19JBWo1zxItMOcXC5ZDwGCdgjZoCkit6adLpz6LUxbZuO0ZQz00rz8VWrvl',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log('stripeToken  invoke : ', stripeToken);
            alert('Payment has been successfully!');
            this.toastr.success('Payment has been successfully!!!');
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }
}
