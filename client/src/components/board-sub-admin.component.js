


import React, { Component } from "react";
import AuthService from "../services/auth.service";

const Record = (props) => (
  <tr key={props.record.id}>
    <td>{props.record.clname}</td>
    <td>{props.record.priority}</td>
    <td>{props.record.ucc}</td>
    <td>{props.record.kslucc}</td>
    <td>{props.record.ks_panno}</td>
    <td>{props.record.locationid}</td>
    <td>{props.record.closer_trf}</td>
    <td>
      <button
        className="btn btn-link"
        onClick={() => props.onView(props.record)}
      >
        View
      </button>
    </td>
  </tr>
);

export default class BoardSubAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      letterData: [],
      selectedRecord: null,
      dpsohData: [],
      ledgerData: [],
      mtfpoData: [],
      netpoData: [],
      portfoData: [],
      nomineeData: [],
      isViewingRecord: false,
      hoveredDptype: "",
      mousePosition: { x: 0, y: 0 },
      searchValue: "",
      activeButton: null,
      dataFound: true,
    };
  }

  handleHover = (event, dptype) => {
    this.setState({
      hoveredDptype: dptype,
      mousePosition: { x: event.clientX, y: event.clientY },
    });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredDptype: "" });
  };

  componentDidMount() {
    this.getLetterData();
  }

  getLetterData = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/letter/");
      const letterData = await response.json();
      const filteredLetterData = letterData.filter(
        (record) =>
          currentUser.username === record.kslucc
      );
      this.setState({ letterData: filteredLetterData.length > 0 ? filteredLetterData : null  });
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
};


  handleView = async (record) => {
    this.setState({
      selectedRecord: record,
      isViewingRecord: true,
      dpsohData: [],
      ledgerData: [],
      mtfpoData: [],
      netpoData: [],
      portfoData: [],
      nomineeData: [],
    });
  };

  handleViewDpsoh = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/dpsoh/");
      const dpsohData = await response.json();
      const selectedDpsohData = dpsohData.filter(
        (item) => item.kslucc === currentUser.username
      );
      if (selectedDpsohData.length > 0) {
        this.setState({ dpsohData: selectedDpsohData });
        this.setState({ activeButton: 'dpsoh' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
  };
  

  handleViewLedger = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/ledger/");
      const ledgerData = await response.json();
      const selectedLedgerData = ledgerData.filter(
        (item) => item.ucc === currentUser.username
      );
      if (selectedLedgerData.length > 0) {
        this.setState({ ledgerData: selectedLedgerData });
        this.setState({ activeButton: 'ledger' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
  };

  handleViewMtfpo = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/mtfpo/");
      const mtfpoData = await response.json();
      const selectedMtfpoData = mtfpoData.filter(
        (item) => item.ucc === currentUser.username
      );
      if (selectedMtfpoData.length > 0) {
        this.setState({ mtfpoData: selectedMtfpoData });
        this.setState({ activeButton: 'mtfpo' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
  };

  handleViewNetpo = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/netpo/");
      const netpoData = await response.json();
      const selectedNetpoData = netpoData.filter(
        (item) => item.ucc === currentUser.username
      );
      if (selectedNetpoData.length > 0) {
        this.setState({ netpoData: selectedNetpoData });
        this.setState({ activeButton: 'netpo' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
  };

  handleViewPortfo = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/portfo/");
      const portfoData = await response.json();
      const selectedPortfoData = portfoData.filter(
        (item) => item.ucc === currentUser.username
      );
      if (selectedPortfoData.length > 0) {
        this.setState({ portfoData: selectedPortfoData });
        this.setState({ activeButton: 'portfo' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
  };

  handleViewNominee = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await fetch("http://183.182.84.228:4005/nominee/");
      const nomineeData = await response.json();
      const selectedNomineeData = nomineeData.filter(
        (item) => item.kslucc === currentUser.username
      );
      if (selectedNomineeData.length > 0) {
        this.setState({ nomineeData: selectedNomineeData });
        this.setState({ activeButton: 'nominee' });
      } else {
        window.alert('Data not found for selected record.');
      }
    } catch (error) {
      window.alert(`An error occurred: ${error}`);
    }
  };

  handleExitView = () => {
    this.setState({ isViewingRecord: false });
  };

  handleSearchChange = (event) => {
    this.setState({ searchValue: event.target.value }, this.getLetterData);
  };

  render() {
    const {
      letterData,
      selectedRecord,
      dpsohData,
      ledgerData,
      portfoData,
      mtfpoData,
      netpoData,
      nomineeData,
      isViewingRecord,
      hoveredDptype,
      mousePosition,
      activeButton,
      dataFound
    } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>

        

       
          <div>

          {letterData &&  letterData.length > 0 &&(
          <div>
            <table class="6">
  <thead>
    <tr>
    <th>UCC </th>
<th>Kotak UCC</th>
<th>Client Name</th>
<th>LocationId</th>
<th>Pan</th>  
<th>Mobile</th>
<th>Email</th>   
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{letterData[0].ucc }</td>
<td>{letterData[0].kslucc}</td>
<td>{letterData[0].clname }</td>
<td>{letterData[0].locationid}</td>
<td>{letterData[0].ks_panno}</td>   
<td>{letterData[0].ks_mobile}</td>   
<td>{letterData[0].ks_emailid}</td>   
    </tr>
  </tbody>
</table>
<br/><br/>
          </div>
        )}
            <button onClick={this.handleViewDpsoh}>View DPSOH</button>

            <button onClick={this.handleViewLedger}>View Ledger</button>

            <button onClick={this.handleViewMtfpo}>View Mtfpo</button>

            <button onClick={this.handleViewNetpo}>View Netpo</button>

            <button onClick={this.handleViewPortfo}>Portfolio</button>

            <button onClick={this.handleViewNominee}>Nominee</button>

        {activeButton === 'dpsoh' && dpsohData !== null && (
          <div>
           
              {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
              <div>
            <h3>DPSOH </h3>
            <table className="table table-striped table-scroll">
              <thead>
                <tr>
                  <th>bactype</th>
                  <th>nsesymbl</th>
                  <th>isin</th>
                  <th>ks_dpsoh</th>
                  <th>scrate</th>
                  <th>dp_sohval</th>
                  <th>bsecode</th>
                  <th>hldgdt</th>
                  <th>ks_dpid</th>
                  <th>cldpid</th>
                  <th>soh_brcd</th>
                  <th>cc_id</th>
                  <th>bkflag</th>
                  <th>bklkcd</th>
                  <th>lkinreldt</th>
                  <th>dpidpri</th>
                  <th>varvfodp</th>
                  <th>sccatg</th>
                  <th>catgdespn</th>
                  <th>comsccd</th>
                </tr>
              </thead>
              <tbody>
                {dpsohData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.bactype}</td>
                    <td
                      onMouseEnter={(e) => this.handleHover(e, record.scrname)}
                      onMouseMove={(e) => this.setState({ mousePosition: { x: e.clientX, y: e.clientY } })}
                      onMouseLeave={this.handleMouseLeave}>{record.nsesymbl}</td>
                    <td>{record.isin}</td>
                    <td>{record.ks_dpsoh}</td>
                    <td>{record.scrate}</td>
                    <td>{record.dp_sohval}</td>
                    <td>{record.bsecode}</td>
                    <td>{record.hldgdt}</td>
                    <td>{record.ks_dpid}</td>
                    <td>{record.cldpid}</td>
                    <td>{record.soh_brcd}</td>
                    <td>{record.cc_id}</td>
                    <td>{record.bkflag}</td>
                    <td>{record.bklkcd}</td>
                    <td>{record.lkinreldt}</td>
                    <td>{record.dpidpri}</td>
                    <td>{record.varvfodp}</td>
                    <td>{record.sccatg}</td>
                    <td>{record.catgdespn}</td>
                    <td>{record.comsccd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {hoveredDptype && (
              <div style={{
                position: 'absolute',
                top: mousePosition.y + 10,
                left: mousePosition.x + 10,
                backgroundColor: 'white',
                padding: '5px',
                border: '1px solid #ccc',
              }}>
                <strong>Scrname:</strong> {hoveredDptype}
              </div>
            )}
            </div>
           
          </div>
          
        )}

        {activeButton === 'ledger' && ledgerData !== null && (
          <div>
            {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
            <h3>Balance</h3>
            {ledgerData.map((record) => (
              <div>
                <div style={{width:'50%', float:'left'}}>
<table>
  <tr>
    

    
<th>LedgerBalance(With Ini+Exp Margin+Mtf)-(F)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.ledgbal}</td>
</tr>
<tr>  
    <th>MTF Funding Value -(F4)</th>
    <td style={{backgroundColor:"white", textAlign:"right"}}>{record.mtfundval}</td>
    </tr>
<tr>
<th>Total Un Billed-(G)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{record.tunbilled}</td>
</tr><tr>
<th>UnclearAmt-(H)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{record.unclramt}</td>
</tr>
<tr style={{border:"2px solid black"}}>
<th>Total Balance -(I=F+G+H)</th>
<td style={{border:"2px solid black", textAlign:"right"}}>{record.totalbal}</td>
  </tr>



  <tr>  
  <th>InitalMargin-(J)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{record.inimgn}</td>
</tr><tr>
  <th>Exposure -(K)</th>
  <td style={{backgroundColor:"white", textAlign:"right"}}>{record.exposure}</td>
  </tr><tr>
<th>AdditionalMargin-(L)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{record.additnal}</td>
</tr>

<tr style={{border:"2px solid black"}}>
<th>Net Value-(M=I-J-K-L)</th>
<td style={{border:"2px solid black", textAlign:"right" , backgroundColor:"lightgray"}}>{record.netvalue}</td>
  </tr>







    <tr>
  <th>PledgeshareValue P1&P3 (NormalPledge)-(O)</th>
  <td style={{backgroundColor:"white", textAlign:"right"}}>{record.pldgqp1p3}</td>
  </tr><tr>
<th>PledgeshareValue P2(MTF)-(P)</th>
<td style={{backgroundColor:"white", textAlign:"right"}}>{record.pldgqp2}</td>
  </tr>



  <tr>

<th>Benificiary -(Q)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.security1}</td>
</tr>
<tr>
<th>MF,SGB,T-Bill Etc-(R)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.othmgn1}</td>
</tr>
<tr>
<th>Delivered Amt-(S)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.delvdamt}</td>
</tr>

  <tr style={{border:"2px solid black"}}>  
  <th>Total Margin-(V=O+P+Q+R+S)</th>
  <td style={{backgroundColor:"lightgray", textAlign:"right" ,border:"2px solid black"}}>{record.tmargin}</td>
</tr><tr style={{border:"2px solid black"}}>
<th>NetMargin-(W=V-M)</th>
<td style={{backgroundColor:"lightgray", textAlign:"right", border:"2px solid black"}}>{record.netmargin}</td>
</tr><tr style={{border:"2px solid black"}}>
<th >Net Margin based on Pledge-(X=O+P+R-F)</th>

<td style={{backgroundColor:"lightgray", textAlign:"right" , border:"2px solid black"}}>{record.nmgnboplg}</td>
  </tr>
  </table>

</div>




<div style={{width:'50%', float:'right'}}>
<table>
  <tr>
  <th>MCX Ledger balance -(F1)</th>
  <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.mcxledger}</td>
  </tr><tr>
<th>NCDEX Ledger balance -(F2)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.ncdledger}</td>
</tr><tr>
<th>NSECDS Ledger balance -(F3)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.ncdsledger}</td>
</tr><tr>
<th>Auction Debit 150% -(N)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.jv150}</td>
</tr><tr>
<th>PendingProofAmt (Oth DP Trf)-(T)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.pndgprfamt}</td>
</tr><tr>
<th>PayoutPendingAmt (UnRegdBank Trf)-(U)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.popndgamt}</td>
</tr><tr>
<th>DP SOH Value-(Y)</th>
<td style={{backgroundColor:"white" , textAlign:"right"}}>{record.dpsohval}</td>
</tr><tr>
    <th>Margin_post_VAR-(Z)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.mgnpostvr}</td>
    </tr><tr>
    <th>Margin_post_HCUT-(AA)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.mgnpohc}</td>
    </tr><tr>
    <th>Margin_post_HCUT_Maintenance -(AB)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.mgnpohcm}</td>
    </tr><tr>
    <th>Var_margin_LESS_SEC_Margin_POST_HCUT -(AC)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.vmlsmgnphc}</td>
    </tr><tr>
    <th>Aging Greater 5d  -(AD)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.agegr5}</td>
    </tr><tr>
    <th>Excess_Margin -(AE)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.exmargin}</td>
    </tr><tr>
    <th>Derv_Margin -(AF)</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.dervmgn}</td>
    </tr><tr>
    <th>Last Tradeded Date</th>
    <td style={{backgroundColor:"white" , textAlign:"right"}}>{record.lsttrddt}</td>

  </tr>
</table>


</div>
              </div>
            ))}
            </div>
        )}

{activeButton === 'portfo' && portfoData !== null && (
          <div>
         
                {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
            <h3>Portfolio</h3>
            <div>
           <table class="6" className="table table-striped table-scroll">
  <thead>
    <tr>
     
 
<th>Scrip Name</th>
<th>ISIN</th>
<th>Instrument</th>
<th>Qty</th>
<th>AvgCostPrice</th>
<th>CostValue</th>
<th>Market Value</th>
<th>UnReal</th>
<th>MktReturn</th>
<th>Date</th>
<th>Sq Gain</th>
<th>Del Gain</th>
<th>Bse Curr Price</th>
<th>Is Suspend</th>
<th>Common ScripCode</th>
<th>_Branch</th>
<th>Family Group</th>

      
    </tr>
  </thead>
  <tbody>
            {portfoData.map((portf , index) => (
    <tr key={index}>

<td>{portf.sc_shrtnm}</td>
<td>{portf.isin}</td>
<td>{portf.instrument}</td>
<td>{portf.qty}</td>
<td>{portf.avgcost}</td>
<td>{portf.cost}</td>
<td>{portf.mktvalue}</td>
<td>{portf.unreal}</td>
<td>{portf.mreturn}</td>
<td>{portf.date}</td>
<td>{portf.sqgain}</td>
<td>{portf.delgain}</td>
<td>{portf.bse_clrate}</td>
<td>{portf.is_suspend}</td>
<td>{portf.comn_sccd}</td>
<td>{portf.brcd}</td>
<td>{portf.familygrp}</td>
    </tr>
     ))}
  </tbody>
</table>
              </div>
              </div>
            
    
         
        )}

{activeButton === 'mtfpo' && mtfpoData !== null && (
          <div>
            {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
            <h3>Mtf Position</h3>

            <table class="6" className="table table-striped table-scroll">
  <thead>
    <tr>
    
<th>NSE</th>
<th>Qty</th>
<th>Cost Price</th>
<th>Funding Value</th>
<th>Symbol/code</th>
<th>ISIN</th>
<th>Company Script Code</th>
<th>BSE</th>
<th>BSE_series</th>
<th>NSE_series</th>
<th>ODIN ScripCode</th>
<th>_Branch</th>
<th>Family Group</th>
<th>ScripName</th>



      
    </tr>
  </thead>
  <tbody>
            {mtfpoData.map((mtfpo,index) => (
    <tr key={index}>

<td>{mtfpo.nse}</td>
<td>{mtfpo.qty}</td>
<td>{mtfpo.cost_rate}</td>
<td>{mtfpo.mtf_value}</td>
<td>{mtfpo.symbol}</td>
<td>{mtfpo.isin}</td>
<td>{mtfpo.co_sccode}</td>
<td>{mtfpo.bse}</td>
<td>{mtfpo.bse_sers}</td>
<td>{mtfpo.nse_sers}</td>
<td>{mtfpo.odin_sccd}</td>
<td>{mtfpo.brcd}</td>
<td>{mtfpo.familygrp}</td>
<td>{mtfpo.scrname}</td>
    </tr>
            ))}
  </tbody>
</table>
</div>
       
          
        )}


{activeButton === 'netpo' && netpoData !== null && (
          <div>
            {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
            <h3>Open Position</h3>
            <table class="6" className="table table-striped table-scroll">
    <thead>
      <tr>
       
  
  <th>Symbole</th>
  <th>ExpDate</th>
  <th>StrikePrice</th>
  <th>OptType</th>
  <th>PurchaseQty</th>
  <th>Sold_Qty</th>
  <th>NetQty</th>
  <th>Net_Rate</th>
  <th>Purchase_Amt</th>
  <th>Sold_Amt</th>
  <th>Net_Amt</th>
  <th>Net_Value</th>
  <th>Exch Code</th>
  <th>ScriptRate</th>
  <th>FutOpt</th>
  <th>Company Script Code</th>
  <th>ScripName</th>
  <th>_Branch</th>
  <th>Family Group</th>
 
  
        
      </tr>
    </thead>
    <tbody>
            {netpoData.map((netpo,index) => (    
      <tr key={index}>
  <td>{netpo.symbole}</td>
  <td>{netpo.expdate}</td>
  <td>{netpo.stkprice}</td>
  <td>{netpo.opttype}</td>
  <td>{netpo.purc_qty}</td>
  <td>{netpo.soldqty}</td>
  <td>{netpo.net_qty}</td>
  <td>{netpo.net_rate}</td>
  <td>{netpo.purc_amt}</td>
  <td>{netpo.sold_amt}</td>
  <td>{netpo.net_amt}</td>
  <td>{netpo.net_value}</td>
  <td>{netpo.exch_code}</td>
  <td>{netpo.scrprate}</td>
  <td>{netpo.futopt}</td>
  <td>{netpo.scripcd}</td>
  <td>{netpo.scripnm}</td>
  <td>{netpo.brcd}</td>
  <td>{netpo.familygrp}</td>

  
      </tr>
       ))}
    </tbody>
  </table>
  </div>
        
          
        )}



{activeButton === 'nominee' && nomineeData !== null && (
          <div>
            {!dataFound && (
                <div className="alert alert-warning" role="alert">
                  Data not found!
                </div>
              )}
            <h3>Ledger Data</h3>
            <table class="6" className="table table-striped table-scroll">
    <thead>
      <tr>
       
      
<th>barcode</th>
<th>brcd</th>
<th>cl_grp</th>
<th>ucc</th>
<th>kslucc</th>
<th>ksluccnm</th>
<th>panno</th>
<th>locnid</th>
<th>ksemailid</th>
<th>ksmobile</th>
<th>es_nomn</th>
<th>es_nompan</th>
<th>es_nomshr</th>
<th>es_relwapc</th>
<th>ks_nomn</th>
<th>ks_nompan</th>
<th>ks_nomshr</th>
<th>ks_relwapc</th>    
      </tr>
    </thead>
    <tbody>
            {nomineeData.map((nominee) => (
            
           
      <tr >
<td>{nominee && nominee.barcode ? nominee.barcode : ""}</td>
<td>{nominee && nominee.brcd ? nominee.brcd: ""}</td>
<td>{nominee && nominee.cl_grp ? nominee.cl_grp :" "}</td>
<td>{nominee && nominee.ucc ? nominee.ucc : " "}</td>
<td>{nominee && nominee.kslucc ? nominee.kslucc:""}</td>
<td>{nominee && nominee.ksluccnm ? nominee.ksluccnm : " "}</td>
<td>{nominee && nominee.panno ?nominee.panno : " "}</td>
<td>{nominee && nominee.locnid ? nominee.locnid : " "}</td>
<td>{nominee && nominee.ksemailid ? nominee.ksemailid : " "}</td>
<td>{nominee && nominee.ksmobile ? nominee.ksmobile : " "}</td>
<td>{nominee && nominee.es_nomn ? nominee.es_nomn : " "}</td>
<td>{nominee && nominee.es_nompan ? nominee.es_nompan : " "}</td>
<td>{nominee && nominee.es_nomshr ? nominee.es_nomshr : " "}</td>
<td>{nominee && nominee.es_relwapc ? nominee.es_relwapc : " "}</td>
<td>{nominee && nominee.ks_nomn ? nominee.ks_nomn : " "}</td>
<td>{nominee && nominee.ks_nompan ? nominee.ks_nompan : " "}</td>
<td>{nominee && nominee.ks_nomshr ? nominee.ks_nomshr : " "}</td>
<td>{nominee && nominee.ks_relwapc ? nominee.ks_relwapc : " "}</td>
      </tr>
      ))}
    </tbody>
  </table>
  
          </div>
          )}
          </div>
{/*         
          <div>
            <h3>Record List</h3>
            <input
          type="text"
          placeholder="Search..."
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
        />
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Priority</th>
                  <th>UCC</th>
                  <th>KSLUCC</th>
                  <th>KS_PANNO</th>
                  <th>LocationID</th>
                  <th>Closer_TRF</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {letterData.map((record, index) => (
                  <Record key={index} record={record} onView={this.handleView} />
                ))}
              </tbody>
            </table>
            

          </div>
        */}

        
      </div>
    );
  }
}






