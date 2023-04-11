import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ShowInvoice() {
  const { id } = useParams();
  const [invoices, setInvoices] = useState([]);

  async function fetchInvoice() {
    try {
      const result = await axios.get(
        `http://127.0.0.1:8000/api/invoice/${id}/`
      );
      setInvoices([result.data]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchInvoice();
  }, []);

  return (
    <>
      <table className="table table-striped table-hover">
        <tbody>
          <tr>
            <th>Invoice Number</th>
            <th>Customer Name</th>
          </tr>
          {invoices.map((invoice) => (
            <>
              <tr>
                <td>{invoice.invoice_number}</td>
                <td>{invoice.customer.name}</td>
              </tr>
            </>
          ))}
        </tbody>
        <tbody>
          {invoices.map((invoice) => (
            <>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Cost per Quantity</th>
                <th>Total Cost</th>
                <th>Cost per Quantity with Offer</th>
                <th>Total Cost with GST</th>
                <th>Total Cost with Offer</th>
              </tr>
              {invoice.product_in_invoice.map((product) => (
                <>
                  <tr key={product.invoice_product_id}>
                    <td>{product.product_invoice.name}</td>
                    <td>{product.invoice_product_quantity}</td>
                    <td>{product.invoice_product_cost_per_quantity}</td>
                    <td>{product.invoice_product_total_cost}</td>
                    <td>
                      {product.invoice_product_cost_per_quantity_with_offer}
                    </td>
                    <td>{product.invoice_product_total_cost_with_gst}</td>
                    <td>{product.invoice_product_total_cost_with_offer}</td>
                  </tr>
                </>
              ))}
            </>
          ))}
        </tbody>
        <tbody>
          <tr>
            <th>Total Cost without GST</th>
            <th>Total Cost with GST</th>
          </tr>
          {invoices.map((invoice) => (
            <>
              <tr>
                <td>{invoice.total_cost_without_gst}</td>
                <td>{invoice.total_cost_with_gst}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
