const { Sequelize } = require("sequelize");
const personModel = require("../models/person.model");
const letterModel = require("../models/letter.model");
const diffModel = require("../models/diff.model");
const prioModel = require("../models/prio.model");
const esignModel = require("../models/esign.model");
const mtfModel = require("../models/mtf.model");
const ledgerModel = require("../models/ledger.model");
const dpsohModel = require("../models/dpsoh.model");
const mtfpoModel = require("../models/mtfpo.model");
const netpoModel = require("../models/netpo.model");
const portfoModel = require("../models/portfo.model");
const nomineeModel = require("../models/nominee.model");
const liqusModel = require("../models/liqus.model");
const brokModel = require("../models/brok.model");
const sebiModel = require("../models/sebi.model");
const cuspaModel = require("../models/cuspa.model");
const pttModel = require("../models/ptt.model");
const dbrokModel = require("../models/dbrok.model");
const crmModel = require("../models/crm.model");
const esdpsohModel = require("../models/esdpsoh.model");
const pfdiffModel = require("../models/pfdiff.model");
const pfdiffremModel = require("../models/pfdiffrem.model");
const predetailModel = require("../models/predetail.model");
const porteqModel = require("../models/porteq.model");
const portcomModel = require("../models/portcom.model");
const userrecordsModel = require("../models/userrecords.model");
const predetailsModel = require("../models/predetails.model");
const predetailssModel = require("../models/predetailss.model");
const oorderModel = require("../models/oorder.model");
const ncorderModel = require("../models/ncorder.model");
const nporderModel = require("../models/nporder.model");
const dealslipModel = require("../models/dealslip.model");
const apdealerModel = require("../models/apdealer.model");
const krastatusModel = require("../models/krastatus.model");
const diffdataModel = require("../models/diffdata.model");
const kslledgerModel = require("../models/kslledger.model");
const trialbalModel = require("../models/trialbal.model");
const ledgertrnModel = require("../models/ledgertrn.model");
const dpsohdiffModel = require("../models/dpsohdiff.model");

const dptransModel = require("../models/dptrans.model");
const isinmasterModel = require("../models/isinmaster.model");
const kslpfModel = require("../models/kslpf.model");
const removedbossModel = require("../models/removedboss.model");
const qtydiffModel = require("../models/qtydiff.model");

const tradeslipModel = require("../models/tradeslip.model");
const tabledateModel = require("../models/tabledate.model");
const ucccountsModel = require("../models/ucccounts.model");
const esldumpModel = require("../models/esldump.model");
// const bhavModel = require("../models/bhav.model");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.SQL_PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
      options: { encrypt: false ,  requestTimeout: 30000},
    },
  }
);

const db = {};
db.Person = personModel(sequelize);
db.letter = letterModel(sequelize);
db.diff = diffModel(sequelize);
db.prio = prioModel(sequelize);
db.esign = esignModel(sequelize);
db.mtf = mtfModel(sequelize);
db.ledger = ledgerModel(sequelize);
db.dpsoh = dpsohModel(sequelize);
db.mtfpo = mtfpoModel(sequelize);
db.netpo = netpoModel(sequelize);
db.portfo = portfoModel(sequelize);
db.nominee = nomineeModel(sequelize);
db.liqus = liqusModel(sequelize);
db.brok = brokModel(sequelize);
db.sebi = sebiModel(sequelize);
db.cuspa = cuspaModel(sequelize);
db.ptt = pttModel(sequelize);
db.dbrok = dbrokModel(sequelize);
db.crm = crmModel(sequelize);
db.esdpsoh = esdpsohModel(sequelize);
db.pfdiff = pfdiffModel(sequelize);
db.pfdiffrem = pfdiffremModel(sequelize);
db.predetail = predetailModel(sequelize);
db.porteq = porteqModel(sequelize);
db.portcom = portcomModel(sequelize);
db.userrecords = userrecordsModel(sequelize);
db.predetails = predetailsModel(sequelize);
db.predetailss = predetailssModel(sequelize);
db.oorder = oorderModel(sequelize);
db.ncorder = ncorderModel(sequelize);
db.nporder = nporderModel(sequelize);
db.dealslip = dealslipModel(sequelize);
db.apdealer = apdealerModel(sequelize);
db.krastatus = krastatusModel(sequelize);
db.diffdata = diffdataModel(sequelize);
db.kslledger = kslledgerModel(sequelize);
db.trialbal = trialbalModel(sequelize);
db.ledgertrn = ledgertrnModel(sequelize);
db.dpsohdiff = dpsohdiffModel(sequelize);

db.dptrans = dptransModel(sequelize);
db.isinmaster = isinmasterModel(sequelize);
db.kslpf = kslpfModel(sequelize);
db.removedboss = removedbossModel(sequelize);
db.qtydiff = qtydiffModel(sequelize);
db.tradeslip = tradeslipModel(sequelize);

db.tabledate = tabledateModel(sequelize);

db.ucccounts = ucccountsModel(sequelize);
db.esldump = esldumpModel(sequelize);
db.sequelize = sequelize;
// sync all models with database
/*This checks what is the current state of the table in the database (which columns it has, 
  what are their data types, etc),
 and then performs the necessary changes in the table to make it match the model.*/
sequelize.sync({ alter: true });

module.exports = db;
