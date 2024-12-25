import React from 'react'
import '../styles/insuranceData.css'
import MorgpLogo from '../assets/assets_frontend/morgp-logo.png'

export default function InsuranceData() {
  const printInvoice = () => {
    const printContents = document.getElementById('print-area').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
};

const downloadInvoice = () => {
    const invoiceContent = document.getElementById('print-area').innerHTML;
    const blob = new Blob([invoiceContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'invoice.html';
    link.click();
};

  return (
    <div className="invoice-wrapper" id="print-area">
    <div className="invoice">
        <div className="invoice-container">
            <div className="invoice-head">
                <div className="invoice-head-top">
                    <div className="invoice-head-top-left text-start">
                        <img src={MorgpLogo} alt="Logo" />
                    </div>
                    <div className="invoice-head-top-right text-end">
                        <h3>Invoice</h3>
                    </div>
                </div>
                <div className="hr"></div>
                <div className="invoice-head-middle">
                    <div className="invoice-head-middle-left text-start">
                        <p><span className="text-bold">Date</span>: 05/12/2020</p>
                    </div>
                    <div className="invoice-head-middle-right text-end">
                        <p><span className="text-bold">Invoice No:</span>16789</p>
                    </div>
                </div>
                <div className="hr"></div>
                <div className="invoice-head-bottom">
                    <div className="invoice-head-bottom-left">
                        <ul>
                            <li className='text-bold'>Invoiced To:</li>
                            <li>Smith Rhodes</li>
                            <li>15 Hodges Mews, High Wycombe</li>
                            <li>HP12 3JL</li>
                            <li>United Kingdom</li>
                        </ul>
                    </div>
                    <div className="invoice-head-bottom-right">
                        <ul className="text-end">
                            <li className='text-bold'>Pay To:</li>
                            <li>Koice Inc.</li>
                            <li>2705 N. Enterprise</li>
                            <li>Orange, CA 89438</li>
                            <li>contact@koiceinc.com</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="overflow-view">
                <div className="invoice-body">
                    <table>
                        <thead>
                            <tr>
                                <td className="text-bold">Service</td>
                                <td className="text-bold">Description</td>
                                <td className="text-bold">Rate</td>
                                <td className="text-bold">QTY</td>
                                <td className="text-bold">Amount</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Design</td>
                                <td>Creating a website design</td>
                                <td>$50.00</td>
                                <td>10</td>
                                <td className="text-end">$500.00</td>
                            </tr>
                            <tr>
                                <td>Development</td>
                                <td>Website Development</td>
                                <td>$50.00</td>
                                <td>10</td>
                                <td className="text-end">$500.00</td>
                            </tr>
                            <tr>
                                <td>SEO</td>
                                <td>Optimize the site for search engines (SEO)</td>
                                <td>$50.00</td>
                                <td>10</td>
                                <td className="text-end">$500.00</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="invoice-body-bottom">
                        <div className="invoice-body-info-item border-bottom">
                            <div className="info-item-td text-end text-bold">Sub Total:</div>
                            <div className="info-item-td text-end">$2150.00</div>
                        </div>
                        <div className="invoice-body-info-item border-bottom">
                            <div className="info-item-td text-end text-bold">Tax:</div>
                            <div className="info-item-td text-end">$215.00</div>
                        </div>
                        <div className="invoice-body-info-item">
                            <div className="info-item-td text-end text-bold">Total:</div>
                            <div className="info-item-td text-end">$21365.00</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="invoice-foot text-center">
                <p><span className="text-bold text-center">NOTE:&nbsp;</span>This is a computer-generated receipt and does not require a physical signature.</p>

                <div className="invoice-btns">
                    <button type="button" className="invoice-btn" onClick={printInvoice}>
                        <span>
                            <i className="fa-solid fa-print"></i>
                        </span>
                        <span>Print</span>
                    </button>
                    <button type="button" className="invoice-btn" onClick={downloadInvoice}>
                        <span>
                            <i className="fa-solid fa-download"></i>
                        </span>
                        <span>Download</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}
