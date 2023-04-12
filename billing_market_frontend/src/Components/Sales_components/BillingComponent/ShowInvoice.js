import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  const exportTable = () => {
    // Create a new Blob object with the table data
    const blob = new Blob(
      [document.getElementById("table-to-export").outerHTML],
      {
        type: "application/vnd.ms-excel",
      }
    );

    // Use the URL.createObjectURL() method to generate a URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create a new anchor element to use as the download link
    const link = document.createElement("a");
    link.href = url;
    link.download = "table.xls";
    link.click();
  };

  const exportToPdf = () => {
    // Use html2canvas to capture the HTML element and convert it to a canvas
    html2canvas(document.querySelector("#table-to-export")).then((canvas) => {
      // Use jsPDF to create a new PDF document
      const pdf = new jsPDF("p", "mm", "a4");
      // Use the addImage method to add the canvas as an image in the PDF document
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 180, 0);
      // Use the save method to download the PDF document
      pdf.save("table.pdf");
    });
  };

  return (
    <>
      <div className="mt-5">
        <table className="table table-striped table-hover" id="table-to-export">
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
        <br />
        <br />
        <center>
          <button
            className="download-table-xls-button btn btn-success mb-3 me-3"
            onClick={exportTable}
          >
            Export Data to Excel Sheet
          </button>
          <button
            className="download-table-pdf-button btn btn-success mb-3"
            onClick={exportToPdf}
          >
            Export Data to PDF
          </button>
        </center>
      </div>
    </>
  );
}
