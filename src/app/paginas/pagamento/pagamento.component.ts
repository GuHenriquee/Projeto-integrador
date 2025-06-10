import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { pagamentoService } from '../../services/pagamento.service';
import { SupabaseService } from '../../services/supabase.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

// Declare MercadoPago and PaymentBrickController to avoid TypeScript errors
declare const MercadoPago: any;
declare const PaymentBrickController: any;

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.css'
})
export class PagamentoComponent implements OnInit, OnDestroy, AfterViewInit {
  private mp: any;
  private bricksBuilder: any;
  private paymentBrickController: any;

  // IMPORTANT: Replace with your actual Mercado Pago Public Key
  private MERCADO_PAGO_PUBLIC_KEY = 'TEST-ec9eb387-ab38-4ca4-9e6c-b74bbe0bedb7'; 

  constructor(private pagamentoService: pagamentoService, private supabaseService:SupabaseService, private route: ActivatedRoute) { }

  evento: any = null;

  ngOnInit(): void {
    this.pegarEventoPorUrl();
    // Load the Mercado Pago SDK script dynamically if not already present
    // This is good practice if you don't want to add it directly in index.html
    if (!document.getElementById('mercadopago-sdk')) {
      const script = document.createElement('script');
      script.id = 'mercadopago-sdk';
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.onload = () => this.initializeMercadoPago();
      document.head.appendChild(script);
    } else {
      this.initializeMercadoPago();
    }
  }

  ngAfterViewInit(): void {
    // If the SDK is already loaded by the time AfterViewInit runs, initialize.
    // This handles cases where the script might be cached or loaded very quickly.
    if (this.mp && !this.paymentBrickController) {
      this.renderPaymentBrick();
    }
  }

  ngOnDestroy(): void {
    // Destroy the Brick instance when the component is destroyed to prevent memory leaks
    if (this.paymentBrickController) {
      this.paymentBrickController.unmount();
    }
  }

  pegarEventoPorUrl(){
    
    const UrlDoEvento = this.route.snapshot.paramMap.get('UrlDoEvento');
      
        if (UrlDoEvento) {
          this.supabaseService.getEventoByUrl(UrlDoEvento).then(({ data, error }) => {
            if (error) {
              console.error('Erro ao buscar evento:', error.message);
            } else {
              this.evento = data;
              console.log(data)
            }
          });
        }
      }


  private initializeMercadoPago(): void {
    if (typeof MercadoPago !== 'undefined' && !this.mp) {
      this.mp = new MercadoPago(this.MERCADO_PAGO_PUBLIC_KEY, {
        locale: 'pt'
      });
      this.bricksBuilder = this.mp.bricks();
      this.renderPaymentBrick();
    }
  }

  private async renderPaymentBrick(): Promise<void> {
    const settings = {
      initialization: {
        // Amount is required for the Brick to initialize properly.
        // For credit card payments, this amount will be used.
        // For other methods, `preferenceId` might override or provide more context.
        amount: 100.00, // Example amount
        // If you need to generate a preference ID from your backend for certain payment methods:
        // preferenceId: await this.getPreferenceIdFromBackend(), 
        payer: {
          firstName: "Nome", // Example payer data
          lastName: "Sobrenome",
          email: "test@test.com",
        },
      },
      customization: {
        visual: {
          style: {
            theme: "dark",
          },
        },
        paymentMethods: {
          creditCard: "all",
          debitCard: "all",
          ticket: "all",
          bankTransfer: "all",
          atm: "all",
          onboarding_credits: "all",
          wallet_purchase: "all",
          maxInstallments: 1
        },
      },
      callbacks: {
        onReady: () => {
          console.log('Payment Brick is ready!');
          // You can hide a loading spinner here if you have one.
        },
        onSubmit: ({ selectedPaymentMethod, formData }: any): Promise<void> => {
          console.log('Payment data submitted:', { selectedPaymentMethod, formData });
          return new Promise((resolve, reject) => {
            this.pagamentoService.processPayment(formData).subscribe(
              (response) => {
                console.log('Payment processed successfully:', response);
                // Handle successful payment, e.g., redirect to a success page
                resolve();
              },
              (error) => {
                console.error('Error processing payment:', error);
                // Handle payment error, e.g., show an error message to the user
                reject();
              }
            );
          });
        },
        onError: (error: any) => {
          console.error('Payment Brick error:', error);
        },
      },
    };

    try {
      this.paymentBrickController = await this.bricksBuilder.create(
        "payment",
        "paymentBrick_container",
        settings
      );
    } catch (error) {
      console.error('Error creating Payment Brick:', error);
    }
  }

  // Example of how you might get a preference ID from your backend if needed
  // private async getPreferenceIdFromBackend(): Promise<string | undefined> {
  //   try {
  //     const response = await this.mercadopagoService.generatePreferenceId().toPromise();
  //     return response.id;
  //   } catch (error) {
  //     console.error('Error fetching preference ID:', error);
  //     return undefined;
  //   }
  // }
}
