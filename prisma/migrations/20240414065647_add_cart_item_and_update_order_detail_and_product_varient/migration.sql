/*
  Warnings:

  - You are about to drop the column `product_id` on the `order_details` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `product_varients` table. All the data in the column will be lost.
  - Added the required column `product_varient_id` to the `order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_tracking_stock` to the `product_varients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `product_varients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_product_id_fkey";

-- AlterTable
ALTER TABLE "order_details" DROP COLUMN "product_id",
ADD COLUMN     "product_varient_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product_varients" DROP COLUMN "stock",
ADD COLUMN     "allocated_stock" INTEGER,
ADD COLUMN     "is_tracking_stock" BOOLEAN NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL,
ADD COLUMN     "total_stock" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "cart_items" (
    "id" TEXT NOT NULL,
    "product_varient_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "end_user_id" TEXT NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_varient_id_fkey" FOREIGN KEY ("product_varient_id") REFERENCES "product_varients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_end_user_id_fkey" FOREIGN KEY ("end_user_id") REFERENCES "end_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_product_varient_id_fkey" FOREIGN KEY ("product_varient_id") REFERENCES "product_varients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
