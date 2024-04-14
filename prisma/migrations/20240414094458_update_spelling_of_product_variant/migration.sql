/*
  Warnings:

  - You are about to drop the column `product_varient_id` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `product_varient_id` on the `order_details` table. All the data in the column will be lost.
  - You are about to drop the `product_varients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_variant_id` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_variant_id` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_product_varient_id_fkey";

-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_product_varient_id_fkey";

-- DropForeignKey
ALTER TABLE "product_varients" DROP CONSTRAINT "product_varients_attribute_option1_id_fkey";

-- DropForeignKey
ALTER TABLE "product_varients" DROP CONSTRAINT "product_varients_attribute_option2_id_fkey";

-- DropForeignKey
ALTER TABLE "product_varients" DROP CONSTRAINT "product_varients_attribute_option3_id_fkey";

-- DropForeignKey
ALTER TABLE "product_varients" DROP CONSTRAINT "product_varients_product_id_fkey";

-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "product_varient_id",
ADD COLUMN     "product_variant_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order_details" DROP COLUMN "product_varient_id",
ADD COLUMN     "product_variant_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "product_varients";

-- CreateTable
CREATE TABLE "product_variants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "attribute_option1_id" TEXT,
    "attribute_option2_id" TEXT,
    "attribute_option3_id" TEXT,
    "sku" TEXT NOT NULL,
    "is_tracking_stock" BOOLEAN NOT NULL,
    "total_stock" INTEGER NOT NULL DEFAULT 0,
    "allocated_stock" INTEGER,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_attribute_option1_id_fkey" FOREIGN KEY ("attribute_option1_id") REFERENCES "attribute_values"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_attribute_option2_id_fkey" FOREIGN KEY ("attribute_option2_id") REFERENCES "attribute_values"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_attribute_option3_id_fkey" FOREIGN KEY ("attribute_option3_id") REFERENCES "attribute_values"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
