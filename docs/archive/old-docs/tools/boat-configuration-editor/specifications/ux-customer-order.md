# 🎨 UX Design : Validation Customer Order avant Impression

**Date** : 13 octobre 2025  
**Objectif** : Ajouter une étape de validation du Customer Order dans l'interface avant le lancement du job d'impression  
**Phase** : Entre Phase 1 (Shop Order → Serial) et Phase 2 (Sélection Imprimante/Langue)

---

## 📊 Contexte

Actuellement, le workflow est :
```
1. Saisie Shop Order
2. Récupération Serial Number
3. Confirmation (Yes/No)
4. → Phase 2 : Sélection Imprimante/Langue
```

**Amélioration proposée** : Afficher le Customer Order associé pour validation avant de continuer vers l'impression.

---

## 🎯 Objectifs

### Objectif Principal
Permettre à l'utilisateur de **vérifier le Customer Order** avant de lancer le job d'impression du document MA_FO_CR_1419.

### Objectifs Secondaires
1. ✅ Rassurer l'utilisateur qu'il imprime pour la bonne commande
2. ✅ Afficher les informations clés du Customer Order
3. ✅ Permettre d'annuler si le Customer Order ne correspond pas
4. ✅ Traçabilité : enregistrer quel Customer Order a été imprimé

---

## 🔄 Nouveau Workflow Proposé

### Workflow Complet Mis à Jour

```
┌─────────────────────────────────────────────────────────────┐
│  ÉTAPE 1 : Saisie Shop Order                                │
│  • Input : Order No, Release No, Sequence No                │
│  • Action : Recherche Shop Order dans IFS                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  ÉTAPE 2 : Récupération DOP & Serial Number                 │
│  • Shop Order → DOP ID                                       │
│  • DOP ID → Serial Number                                    │
│  • Affichage : Serial Number trouvé                          │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  ÉTAPE 3 : Récupération Customer Order (NOUVEAU)            │
│  • Serial Number → Customer Order                            │
│  • Affichage : Customer Order + détails                      │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  ÉTAPE 4 : Validation Customer Order (NOUVEAU)              │
│  • Question : "Confirmer l'impression pour ce Customer      │
│    Order ?"                                                  │
│  • Options : [Confirmer] [Annuler]                          │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  ÉTAPE 5 : Sélection Imprimante & Langue                    │
│  • Dropdowns : Imprimante + Langue                           │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  ÉTAPE 6 : Impression                                        │
│  • Envoi job d'impression IFS                                │
│  • Document : MA_FO_CR_1419                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design de l'Interface

### Écran de Validation Customer Order

#### Layout Proposé

```
┌────────────────────────────────────────────────────────────────┐
│  Manufacturing Portal - Boat Configuration Editor              │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Shop Order: 97277    Status: ✅ Closed                        │
│  Serial Number: LG5MA0114                                      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  📋 Customer Order Details                                │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │                                                            │ │
│  │  Order No:         C1000038587                            │ │
│  │  Line No:          1                                       │ │
│  │  Part No:          LG5MA                                   │ │
│  │  Description:      LAGOON 55                              │ │
│  │  Hull Number:      LG5MA0114  ✅                          │ │
│  │                                                            │ │
│  │  Customer:         FR05A - CONSTRUCTION NAVALE BORDEAUX   │ │
│  │  Status:           Released                                │ │
│  │  Configuration:    63599                                   │ │
│  │  Quantity:         1 PCS                                   │ │
│  │                                                            │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ⚠️  Please confirm you want to print the configuration       │
│     document for this Customer Order                           │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                  │
│  │  ✅ Confirm       │  │  ❌ Cancel        │                  │
│  └──────────────────┘  └──────────────────┘                  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

#### Cas Particulier : Customer Order Non Trouvé

```
┌────────────────────────────────────────────────────────────────┐
│  Manufacturing Portal - Boat Configuration Editor              │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Shop Order: 97277    Status: ✅ Closed                        │
│  Serial Number: LG5MA0114                                      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │  ⚠️  Customer Order Not Found                            │ │
│  ├──────────────────────────────────────────────────────────┤ │
│  │                                                            │ │
│  │  No Customer Order found for Serial Number LG5MA0114      │ │
│  │                                                            │ │
│  │  This could mean:                                          │ │
│  │  • The part is not yet linked to a customer order         │ │
│  │  • The Serial Number is reserved but not assigned         │ │
│  │                                                            │ │
│  │  Do you want to continue with the print anyway?           │ │
│  │                                                            │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                  │
│  │  ⚠️ Continue      │  │  ❌ Cancel        │                  │
│  └──────────────────┘  └──────────────────┘                  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 💻 Implémentation Technique

### 1. Modification du Service Shop Order

**Fichier** : `src/lib/shop-order-service.ts`

```typescript
interface ShopOrderSearchResult {
  shopOrder: ShopOrder
  serialNumber: string
  dopHeaderId: string
  customerOrder: CustomerOrderInfo | null  // ← NOUVEAU
}

interface CustomerOrderInfo {
  orderNo: string
  lineNo: string
  partNo: string
  catalogDesc: string
  chullNumber: string
  customerNo: string
  customerName?: string
  configurationId: string
  status: string
  quantity: number
}

export async function searchShopOrderWithCustomerOrder(
  params: ShopOrderSearchParams
): Promise<ShopOrderSearchResult> {
  // Étape 1 : Rechercher Shop Order
  const shopOrder = await searchShopOrder(params)
  
  // Étape 2 : Récupérer Serial Number
  const serialResult = await getSerialNumberFromDop(shopOrder.DopId)
  
  // Étape 3 : Récupérer Customer Order (NOUVEAU)
  let customerOrder: CustomerOrderInfo | null = null
  
  try {
    const customerOrderLine = await getCustomerOrderFromSerial(serialResult.serialNumber)
    
    if (customerOrderLine) {
      customerOrder = {
        orderNo: customerOrderLine.OrderNo,
        lineNo: customerOrderLine.LineNo,
        partNo: customerOrderLine.PartNo,
        catalogDesc: customerOrderLine.CatalogDesc || 'N/A',
        chullNumber: customerOrderLine.CHullNumber,
        customerNo: customerOrderLine.CustomerNo,
        configurationId: customerOrderLine.ConfigurationId,
        status: customerOrderLine.Objstate,
        quantity: customerOrderLine.BuyQtyDue || customerOrderLine.QtyOrdered || 1
      }
      
      // Optionnel : Récupérer le nom du client
      try {
        const customerHeader = await getCustomerOrderHeader(customerOrder.orderNo)
        customerOrder.customerName = customerHeader.CustomerName
      } catch (error) {
        console.warn('Could not fetch customer name:', error)
      }
    }
  } catch (error) {
    console.warn('Could not fetch Customer Order:', error)
    // Continue sans Customer Order - ce n'est pas bloquant
  }
  
  return {
    shopOrder,
    serialNumber: serialResult.serialNumber,
    dopHeaderId: serialResult.dopHeaderId,
    customerOrder
  }
}
```

### 2. Nouveau Service Customer Order

**Fichier** : `src/lib/customer-order-service.ts`

```typescript
import { getIFSClient } from '@/lib/ifs-client'

export interface CustomerOrderLine {
  OrderNo: string
  LineNo: string
  RelNo: string
  PartNo: string
  CatalogDesc: string
  CHullNumber: string
  CustomerNo: string
  ConfigurationId: string
  Objstate: string
  BuyQtyDue?: number
  QtyOrdered?: number
  DopConnection: string
  Contract: string
}

export interface CustomerOrderHeader {
  OrderNo: string
  CustomerNo: string
  CustomerName: string
  Objstate: string
  DateEntered: string
  Contract: string
}

/**
 * Récupère un Customer Order Line à partir du Serial Number (CHullNumber)
 */
export async function getCustomerOrderFromSerial(
  serialNumber: string
): Promise<CustomerOrderLine | null> {
  const client = getIFSClient()

  try {
    const response = await client.get<IFSODataResponse<CustomerOrderLine>>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $filter: `CHullNumber eq '${serialNumber}'`,
        $select: 'OrderNo,LineNo,RelNo,PartNo,CatalogDesc,CHullNumber,CustomerNo,ConfigurationId,Objstate,BuyQtyDue,DopConnection,Contract'
      }
    )

    if (!response.value || response.value.length === 0) {
      return null
    }

    return response.value[0]
  } catch (error) {
    console.error('Error fetching Customer Order Line:', error)
    return null
  }
}

/**
 * Récupère le header d'un Customer Order pour obtenir le nom du client
 */
export async function getCustomerOrderHeader(
  orderNo: string
): Promise<CustomerOrderHeader> {
  const client = getIFSClient()

  const response = await client.get<IFSODataResponse<CustomerOrderHeader>>(
    'CustomerOrderHandling.svc/CustomerOrderSet',
    {
      $filter: `OrderNo eq '${orderNo}'`,
      $select: 'OrderNo,CustomerNo,CustomerName,Objstate,DateEntered,Contract'
    }
  )

  if (!response.value || response.value.length === 0) {
    throw new Error(`Customer Order ${orderNo} not found`)
  }

  return response.value[0]
}
```

### 3. Modification de l'API Route

**Fichier** : `src/app/api/shop-orders/search/route.ts`

```typescript
import { searchShopOrderWithCustomerOrder } from '@/lib/shop-order-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderNo, releaseNo, sequenceNo } = body

    // Validation...

    const result = await searchShopOrderWithCustomerOrder({
      orderNo,
      releaseNo: releaseNo || '*',
      sequenceNo: sequenceNo || '*'
    })

    return NextResponse.json({
      success: true,
      data: {
        shopOrder: {
          orderNo: result.shopOrder.OrderNo,
          partNo: result.shopOrder.PartNo,
          status: result.shopOrder.Objstate
        },
        serialNumber: result.serialNumber,
        dopHeaderId: result.dopHeaderId,
        customerOrder: result.customerOrder  // ← NOUVEAU
      }
    })
  } catch (error) {
    // Error handling...
  }
}
```

### 4. Composant React : Customer Order Validation

**Fichier** : `src/components/organisms/CustomerOrderValidation.tsx`

```typescript
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/Card'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'

interface CustomerOrderInfo {
  orderNo: string
  lineNo: string
  partNo: string
  catalogDesc: string
  chullNumber: string
  customerNo: string
  customerName?: string
  configurationId: string
  status: string
  quantity: number
}

interface CustomerOrderValidationProps {
  shopOrderNo: string
  serialNumber: string
  customerOrder: CustomerOrderInfo | null
  onConfirm: () => void
  onCancel: () => void
}

export function CustomerOrderValidation({
  shopOrderNo,
  serialNumber,
  customerOrder,
  onConfirm,
  onCancel
}: CustomerOrderValidationProps) {
  
  if (!customerOrder) {
    // Cas : Customer Order non trouvé
    return (
      <Card className="border-amber-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-600">
            <AlertCircle className="h-5 w-5" />
            Customer Order Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            <p>No Customer Order found for Serial Number <strong>{serialNumber}</strong></p>
            <p className="mt-2">This could mean:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>The part is not yet linked to a customer order</li>
              <li>The Serial Number is reserved but not assigned</li>
            </ul>
            <p className="mt-4 font-medium">Do you want to continue with the print anyway?</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onConfirm}
              className="flex-1 border-amber-500 text-amber-600 hover:bg-amber-50"
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Continue Anyway
            </Button>
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Cas : Customer Order trouvé
  const serialMatch = customerOrder.chullNumber === serialNumber

  return (
    <Card className="border-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          Customer Order Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label className="text-gray-500 font-medium">Order No</label>
            <p className="font-semibold">{customerOrder.orderNo}</p>
          </div>
          <div>
            <label className="text-gray-500 font-medium">Line No</label>
            <p className="font-semibold">{customerOrder.lineNo}</p>
          </div>
          
          <div>
            <label className="text-gray-500 font-medium">Part No</label>
            <p className="font-semibold">{customerOrder.partNo}</p>
          </div>
          <div>
            <label className="text-gray-500 font-medium">Description</label>
            <p className="font-semibold">{customerOrder.catalogDesc}</p>
          </div>
          
          <div>
            <label className="text-gray-500 font-medium">Hull Number</label>
            <div className="flex items-center gap-2">
              <p className="font-semibold">{customerOrder.chullNumber}</p>
              {serialMatch ? (
                <Badge variant="success">✅ Match</Badge>
              ) : (
                <Badge variant="destructive">⚠️ Mismatch</Badge>
              )}
            </div>
          </div>
          <div>
            <label className="text-gray-500 font-medium">Status</label>
            <p className="font-semibold">{customerOrder.status}</p>
          </div>
          
          <div>
            <label className="text-gray-500 font-medium">Customer</label>
            <p className="font-semibold">
              {customerOrder.customerNo}
              {customerOrder.customerName && ` - ${customerOrder.customerName}`}
            </p>
          </div>
          <div>
            <label className="text-gray-500 font-medium">Configuration</label>
            <p className="font-semibold">{customerOrder.configurationId}</p>
          </div>
          
          <div>
            <label className="text-gray-500 font-medium">Quantity</label>
            <p className="font-semibold">{customerOrder.quantity} PCS</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-4">
          <p className="text-sm text-blue-800">
            ⚠️ Please confirm you want to print the configuration document for this Customer Order
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={onConfirm}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Confirm
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 5. Intégration dans la Page Principale

**Fichier** : `src/app/boat-configuration/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import { CustomerOrderValidation } from '@/components/organisms/CustomerOrderValidation'

export default function BoatConfigurationPage() {
  const [step, setStep] = useState<'search' | 'validate-customer' | 'select-printer'>('search')
  const [searchResult, setSearchResult] = useState<any>(null)

  async function handleShopOrderSearch(params: any) {
    const response = await fetch('/api/shop-orders/search', {
      method: 'POST',
      body: JSON.stringify(params)
    })
    
    const data = await response.json()
    
    if (data.success) {
      setSearchResult(data.data)
      setStep('validate-customer')  // ← Passer à la validation Customer Order
    }
  }

  function handleCustomerOrderConfirm() {
    setStep('select-printer')  // ← Passer à la sélection imprimante
  }

  function handleCustomerOrderCancel() {
    setStep('search')  // ← Retour à la recherche
    setSearchResult(null)
  }

  return (
    <div>
      {step === 'search' && (
        <ShopOrderSearch onSearch={handleShopOrderSearch} />
      )}
      
      {step === 'validate-customer' && searchResult && (
        <CustomerOrderValidation
          shopOrderNo={searchResult.shopOrder.orderNo}
          serialNumber={searchResult.serialNumber}
          customerOrder={searchResult.customerOrder}
          onConfirm={handleCustomerOrderConfirm}
          onCancel={handleCustomerOrderCancel}
        />
      )}
      
      {step === 'select-printer' && (
        <PrinterLanguageSelection />
      )}
    </div>
  )
}
```

---

## 🧪 Tests à Réaliser

### Test Case 1 : Customer Order Trouvé

**Input** :
- Shop Order : `97277`

**Résultat Attendu** :
- ✅ Affichage Customer Order `C1000038587`
- ✅ Hull Number `LG5MA0114` avec badge "✅ Match"
- ✅ Tous les détails affichés
- ✅ Bouton "Confirm" actif

### Test Case 2 : Customer Order Non Trouvé

**Input** :
- Shop Order : Un Shop Order sans Customer Order lié

**Résultat Attendu** :
- ⚠️ Message "Customer Order Not Found"
- ⚠️ Bouton "Continue Anyway" avec avertissement
- ✅ Possibilité de continuer ou annuler

### Test Case 3 : Mismatch Serial Number

**Input** :
- Shop Order avec Serial Number ne correspondant pas au CHullNumber

**Résultat Attendu** :
- ⚠️ Badge "⚠️ Mismatch" sur le Hull Number
- ⚠️ Message d'avertissement
- ✅ Possibilité de continuer ou annuler

---

## 📊 Avantages de cette Approche

### Pour l'Utilisateur
1. ✅ **Transparence** : Voit exactement pour quelle commande il imprime
2. ✅ **Sécurité** : Peut annuler si le Customer Order ne correspond pas
3. ✅ **Information** : Accès aux détails (client, quantité, config)
4. ✅ **Confiance** : Validation du Hull Number avec badge visuel

### Pour le Système
1. ✅ **Traçabilité** : On sait quel Customer Order a été imprimé
2. ✅ **Robustesse** : Gestion du cas "Customer Order non trouvé"
3. ✅ **Flexibilité** : Possibilité de continuer sans Customer Order si nécessaire
4. ✅ **Logs** : Enregistrement de la validation utilisateur

---

## 🔄 Workflow Alternatif : Sans Customer Order

Si le Customer Order n'est pas trouvé, deux options :

### Option A : Bloquer l'impression
- ❌ Afficher erreur
- ❌ Forcer l'utilisateur à annuler
- ❌ Pas de possibilité de continuer

### Option B : Permettre de continuer (RECOMMANDÉ)
- ⚠️ Afficher avertissement
- ✅ Bouton "Continue Anyway"
- ✅ Log de l'action (impression sans Customer Order validé)
- ✅ Plus flexible pour les cas edge

**Recommandation** : **Option B** car plus flexible et permet de gérer les cas où le Customer Order n'est pas encore créé ou visible via l'API.

---

## 📝 Checklist d'Implémentation

- [ ] Créer `customer-order-service.ts`
- [ ] Modifier `shop-order-service.ts` pour inclure Customer Order
- [ ] Mettre à jour API route `/api/shop-orders/search`
- [ ] Créer composant `CustomerOrderValidation.tsx`
- [ ] Intégrer dans la page principale
- [ ] Ajouter gestion d'état (step management)
- [ ] Tests unitaires services
- [ ] Tests composants React
- [ ] Tests E2E du workflow complet
- [ ] Documentation utilisateur
- [ ] Logs et monitoring

---

## 🔗 Références

- `INVESTIGATION_SERIAL_NUMBER_PHASE3_COMPLETE.md` - Relations Shop Order ↔ Customer Order
- `SPECIFICATION_FONCTIONNELLE.md` - Spec fonctionnelle complète
- `PHASE1_COMPLETE.md` - Implémentation initiale

---

**Status** : 📋 Spécification complète  
**Prochaine étape** : Implémentation du service Customer Order  
**Auteur** : GitHub Copilot  
**Date** : 13 octobre 2025
