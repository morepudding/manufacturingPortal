/**
 * CustomerOrderValidation Component
 * 
 * Affiche les informations du Customer Order et permet à l'utilisateur
 * de valider avant de lancer l'impression.
 * 
 * Ce composant est utilisé dans le workflow :
 * Shop Order → Serial Number → Customer Order → Validation → Print
 */

'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/atoms/Card'
import { Button } from '@/shared/components/atoms/Button'
import { Badge } from '@/shared/components/atoms/Badge'
import { Separator } from '@/shared/components/atoms/Separator'
import { CheckCircle2, AlertCircle, Package, User, Calendar, FileText } from 'lucide-react'

export interface CustomerOrderData {
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
  contract: string
  plannedDeliveryDate: string
  wantedDeliveryDate: string
  customerPoNo?: string
  internalPoNo?: string
}

export interface CustomerOrderValidationProps {
  customerOrder: CustomerOrderData
  serialNumber: string
  serialNumberMatch: boolean
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function CustomerOrderValidation({
  customerOrder,
  serialNumber,
  serialNumberMatch,
  onConfirm,
  onCancel,
  isLoading = false,
}: CustomerOrderValidationProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Customer Order Validation</CardTitle>
            <CardDescription>
              Vérifiez les informations avant de lancer l'impression
            </CardDescription>
          </div>
          {serialNumberMatch ? (
            <Badge variant="success" className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              Serial Number validé
            </Badge>
          ) : (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              Serial Number invalide
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Section: Customer Order Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="h-5 w-5" />
            <h3>Order Information</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Customer Order</p>
              <p className="text-lg font-semibold">{customerOrder.orderNo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Line</p>
              <p className="text-lg font-semibold">{customerOrder.lineNo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="outline">{customerOrder.status}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Contract</p>
              <p className="text-base">{customerOrder.contract}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Section: Part Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Package className="h-5 w-5" />
            <h3>Part Information</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Part Number</p>
              <p className="text-lg font-semibold">{customerOrder.partNo}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-base">{customerOrder.catalogDesc}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Serial Number (CHullNumber)</p>
              <div className="flex items-center gap-2">
                <p className="text-base font-mono">{customerOrder.chullNumber}</p>
                {serialNumberMatch ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
              </div>
              {!serialNumberMatch && (
                <p className="text-sm text-red-600 mt-1">
                  Expected: {serialNumber}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Configuration ID</p>
              <p className="text-base font-mono">{customerOrder.configurationId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quantity</p>
              <p className="text-base">{customerOrder.quantity}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Section: Customer Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <User className="h-5 w-5" />
            <h3>Customer Information</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Customer Name</p>
              <p className="text-lg font-semibold">
                {customerOrder.customerName || customerOrder.customerNo}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Customer Number</p>
              <p className="text-base">{customerOrder.customerNo}</p>
            </div>
            {customerOrder.customerPoNo && (
              <div>
                <p className="text-sm text-muted-foreground">Customer PO</p>
                <p className="text-base">{customerOrder.customerPoNo}</p>
              </div>
            )}
            {customerOrder.internalPoNo && (
              <div>
                <p className="text-sm text-muted-foreground">Internal PO</p>
                <p className="text-base">{customerOrder.internalPoNo}</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Section: Delivery Dates */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Calendar className="h-5 w-5" />
            <h3>Delivery Information</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Wanted Delivery Date</p>
              <p className="text-base">
                {new Date(customerOrder.wantedDeliveryDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Planned Delivery Date</p>
              <p className="text-base">
                {new Date(customerOrder.plannedDeliveryDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading || !serialNumberMatch}
          >
            {isLoading ? 'Chargement...' : 'Confirmer et imprimer'}
          </Button>
        </div>

        {!serialNumberMatch && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              ⚠️ Le Serial Number ne correspond pas. Veuillez vérifier les données avant de continuer.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
