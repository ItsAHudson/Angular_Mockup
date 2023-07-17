import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

//Everything in here is just table creation, reference transaction monitoring for clearer input on 
//how the tables were built


//Tables Initialization Start
interface SFContacts {
  CreatedDate: string;
  Name: string;
  Email: string;
  Phone: string;
  MobilePhone: string;
  Title: string;
  FormerInactive: string;
}

interface VerifiedIP {
  IPAddress: string;
  InsertedBy: string;
  InsertedDT: string;
  VerificationType: string;
}

interface UnkownIP {
  IPAddress: string;
  IPAddresFreq: string;
  FirstSeen: string;
  LastSeen: string;
  AverageLoggin: string;
  IPAge: string;
  NDLO: string;
  Email: string;
}

interface BankDetails {
  CreatedDate: string;
  BankID: string;
  BankName: string;
  RoutingNumber: string;
  AccountNumber: string;
  BankStatus: string;
  VMSID: string;
}

interface DocuSign {
  CreatedDate: string;
  EnvelopeNumber: string;
  Status: string;
  SentAge: string;
  ID: string;
}

interface Payments {
  CreatedDate: string;
  PaymentCompletedDate: string;
  PaymentID: string;
  PaymentType: string;
  PaymentTotal: string;
  PaymentClientName: string;
  PaymentStatus: string;
}

interface Opportunities {
  Type: string;
  Name: string;
  StageName: string;
  CreatedDate: string;
  CloseDate: string;
  ID: string;
}

interface OpportunityActivities {
  CreatedDate: string;
  Subject: string;
  CallType: string;
  F9Ani: string;
  F9ID: string;
  F9Dnis: string;
  F9Cr: string;
  F9An: string;
  Description: string;
  ID: string;
}

interface Cases {
  CreatedDate: string;
  CaseNumber: string;
  Origin: string;
  VCProblem: string;
  VCIssue: string;
  VCResolution: string;
}

interface CaseEmails {
  CreatedDate: string;
  FromAddress: string;
  ToAddress: string;
  FromName: string;
  CCAddress: string;
  BCCAddress: string;
  TextBody: string;
  ID: string;
}

interface CaseActivities{
  CreatedDate: string;
  Subject: string;
  CallType: string;
  Type: string;
  F9Dnis: string;
  F9Ani: string;
  Description: string;
}

interface AccountActivityHistory {
  CreatedDate: string;
  Subject: string;
  CallType: string;
  F9Ani: string;
  F9Dnis: string;
  F9Cr: string;
  F9An: string;
  F9ID: string;
  Description: string;
  WhatID: string;
}

interface InboundEmails {
  CreatedDate: string;
  FromAddress: string;
  ToAddress: string;
  FromName: string;
  CCAddress: string;
  BCCAddress: string;
  TextBody: string;
}

interface DispositionHistory {
  DispositionDate: string;
  Disposition: string;
  Verification: string;
  FraudRiskScore: string;
  CaseOwner: string;
  IPAddress: string;
  Email: string;
}
//Tables Initialization End

@Component({
  selector: 'app-cfm-edit',
  templateUrl: './cfm-edit.component.html',
  styleUrls: ['./cfm-edit.component.css']
})
export class CFMEditComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  
  SFData: any[] = []; 
  SFContactsColumns: string[] = ['CreatedDate', 'Name', 'Email', 'Phone', 'MobilePhone', 'Title', 'FormerInactive'];
  SFContactsData: MatTableDataSource<SFContacts> = new MatTableDataSource<SFContacts>();
  @ViewChild('SFPaginator', { read: MatPaginator }) SFPaginator: any = MatPaginator;

  VIPData: any[] = [];
  VerifiedIPColumns: string[] = ['IPAddress', 'InsertedBy', 'InsertedDate', 'VerificationType'];
  VerifiedIPData: MatTableDataSource<VerifiedIP> = new MatTableDataSource<VerifiedIP>();
  @ViewChild('VIPPaginator', { read: MatPaginator }) VIPPaginator: any = MatPaginator;

  UIPData: any[] = [];
  UnknownIPColumns: string[] = ['IPAddress', 'IPAddressFrequency', 'FirstSeen', 'LastSeen', 'AverageNumberOfLogginsPerDay', 'IPAge', 'NumberOfDaysALogginOccurred', 'Email'];
  UnknownIPData: MatTableDataSource<UnkownIP> = new MatTableDataSource<UnkownIP>();
  @ViewChild('UIPPaginator', { read: MatPaginator }) UIPPaginator: any = MatPaginator;

  BankData: any[] = [];
  BankDetailsColumns: string[] = ['CreatedDate', 'BankID', 'BankName', 'RoutingNumber', 'AccountNumber', 'BankStatus', 'VMSID'];
  BankDetailsData: MatTableDataSource<BankDetails> = new MatTableDataSource<BankDetails>();
  @ViewChild('BankPaginator', { read: MatPaginator }) BankPaginator: any = MatPaginator;
  
  DSData: any[] = [];
  DocuSignColumns: string[] = ['CreatedDate', 'EnvelopeNumber', 'Status', 'SentAge', 'ID'];
  DocuSignData: MatTableDataSource<DocuSign> = new MatTableDataSource<DocuSign>();
  @ViewChild('DocuSignPaginator', { read: MatPaginator }) DocuSignPaginator: any = MatPaginator;

  PayData: any[] = [];
  PaymentsColumns: string[] = ['CreatedDate', 'PaymentCompletedDate', 'PaymentID', 'PaymentType', 'PaymentTotal', 'PaymentClientName', 'PaymentStatus'];
  PaymentsData: MatTableDataSource<Payments> = new MatTableDataSource<Payments>();
  @ViewChild('PaymentsPaginator', { read: MatPaginator }) PaymentsPaginator: any = MatPaginator;

  OppData: any[] = [];
  OpportunitiesColumns: string[] = ['Type', 'Name', 'StageName', 'CreatedDate', 'CloseDate', 'ID'];
  OpportunitiesData: MatTableDataSource<Opportunities> = new MatTableDataSource<Opportunities>();
  @ViewChild('OpportunitiesPaginator', { read: MatPaginator }) OpportunitiesPaginator: any = MatPaginator;

  OppAcData: any[] = [];
  OpportunityActivitiesColumns: string[] = ['CreatedDate', 'Subject', 'CallType', 'FIVE9ANI', 'FIVE9SessionID', 'FIVE9DNIS', 'FIVE9CallRecording', 'FIVE9AgentName', 'Description', 'ID'];
  OpportunityActivitiesData: MatTableDataSource<OpportunityActivities> = new MatTableDataSource<OpportunityActivities>();
  @ViewChild('OppAcPaginator', { read: MatPaginator }) OppAcPaginator: any = MatPaginator;

  CaseData: any[] = [];
  CasesColumns: string[] = ['CreatedDate', 'CaseNumber', 'Origin', 'VCProblem', 'VCIssue', 'VCResolution'];
  CasesData: MatTableDataSource<Cases> = new MatTableDataSource<Cases>();
  @ViewChild('CasesPaginator', { read: MatPaginator }) CasesPaginator: any = MatPaginator;

  CaseEmData: any[] = [];
  CaseEmailsColumns: string[] = ['CreatedDate', 'FromAddress', 'ToAddress', 'FromName', 'CCAddress', 'BCCAddress', 'TextBody', 'ID'];
  CaseEmailsData: MatTableDataSource<CaseEmails> = new MatTableDataSource<CaseEmails>();
  @ViewChild('CaseEmailsPaginator', { read: MatPaginator }) CaseEmailsPaginator: any = MatPaginator;

  CaseAcData: any[] = [];
  CaseActivitiesColumns: string[] = ['CreatedDate', 'Subject','CallType', 'Type', 'FIVE9DNIS', 'FIVE9ANI', 'Description'];
  CaseActivitiesData: MatTableDataSource<CaseActivities> = new MatTableDataSource<CaseActivities>();
  @ViewChild('CaseAcPaginator', { read: MatPaginator }) CaseAcPaginator: any = MatPaginator;

  AccountAcData: any[] = [];
  AccountActivityHistoryColumns: string[] = ['CreatedDate', 'Subject', 'CallType', 'FIVE9ANI', 'FIVE9DNIS', 'FIVE9CallRecording', 'FIVE9AgentName', 'FIVE9SessionID', 'Description', 'WhatID'];
  AccountActivityHistoryData: MatTableDataSource<AccountActivityHistory> = new MatTableDataSource<AccountActivityHistory>();
  @ViewChild('AccountAcPaginator', { read: MatPaginator }) AccountAcPaginator: any = MatPaginator;

  InboundEmData: any[] = [];
  InboundEmailsColumns: string[] = ['CreatedDate', 'FromAddress', 'ToAddress', 'FromName', 'CCAddress', 'BCCAddress', 'TextBody'];
  InboundEmailsData: MatTableDataSource<InboundEmails> = new MatTableDataSource<InboundEmails>();
  @ViewChild('InboundEmailPaginator', { read: MatPaginator }) InboundEmailPaginator: any = MatPaginator;

  DispositionData: any[] = [];
  DispositionHistoryColumns: string[] = ['DispositionDate', 'Disposition', 'Verification', 'FraudRiskScore', 'CaseOwner', 'IPAddress', 'Email'];
  DispositionHistoryData: MatTableDataSource<DispositionHistory> = new MatTableDataSource<DispositionHistory>();
  @ViewChild('DispositionPaginator', { read: MatPaginator }) DispositionPaginator: any = MatPaginator;

  ngAfterViewInit() {
    this.SFContactsData.paginator = this.SFPaginator
    this.VerifiedIPData.paginator = this.VIPPaginator
    this.UnknownIPData.paginator = this.UIPPaginator
    this.BankDetailsData.paginator = this.BankPaginator
    this.DocuSignData.paginator = this.DocuSignPaginator
    this.PaymentsData.paginator = this.PaymentsPaginator
    this.OpportunitiesData.paginator = this.OpportunitiesPaginator
    this.OpportunityActivitiesData.paginator = this.OppAcPaginator
    this.CasesData.paginator = this.CasesPaginator
    this.CaseEmailsData.paginator = this.CaseEmailsPaginator
    this.CaseActivitiesData.paginator = this.CaseAcPaginator
    this.AccountActivityHistoryData.paginator = this.AccountAcPaginator
    this.InboundEmailsData.paginator = this.InboundEmailPaginator
    this.DispositionHistoryData.paginator = this.DispositionPaginator
  }

  ngOnInit() {

    this.generateSFData(20);
    this.generateVerifiedIPData(20);
    this.generateUnverifiedIPData(20);
    this.generateBankData(20);
    this.generateDocuSign(20);
    this.generatePayments(20);
    this.generateOpportunities(20);
    this.generateOpportunityActivity(20);
    this.generateCases(20);
    this.generateCaseEmails(20);
    this.generateCaseActivity(20);
    this.generateAccountActivity(20);
    this.generateInboundEmails(20);
    this.generateDisposition(20);
    
  }


  generateSFData(SFRows: number) {
    for (let i = 1; i <= SFRows; i++) {
      const row = {
        CreatedDate: `CreatedDate ${i}`,
        Name: `Name ${i}`,
        Email: `Email ${i}`,
        Phone: `FundStatus ${i}`,
        MobilePhone: `MobilePhone ${i}`,
        Title: `Title ${i}`,
        FormerInactive: `FormerInactive ${i}`,
      };
      this.SFData.push(row);
    }
    this.SFContactsData = new MatTableDataSource(this.SFData);
  }

  generateVerifiedIPData(VIPRows: number) {
    for (let i = 1; i <= VIPRows; i++) {
      const row = {
        IPAddress: `IPAddress ${i}`,
        InsertedBy: `InsertedBy ${i}`,
        InsertedDate: `InsertedDate ${i}`,
        VerificationType: `VerificationType ${i}`,
      };
      this.VIPData.push(row);
    }
    this.VerifiedIPData = new MatTableDataSource(this.VIPData);
  }

  generateUnverifiedIPData(UIPRows: number) {
    for (let i = 1; i <= UIPRows; i++) {
      const row = {
        IPAddress: `IPAddress ${i}`,
        IPAddressFrequency: `IPAddressFrequency ${i}`,
        FirstSeen: `FirstSeen ${i}`,
        LastSeen: `LastSeen ${i}`,
        AverageNumberOfLogginsPerDay: `AverageNumberOfLogginsPerDay ${i}`,
        IPAge: `IPAge ${i}`,
        NumberOfDaysALogginOccurred: `NumberOfDaysALogginOccurred ${i}`,
        Email: `Email ${i}`,
      };
      this.UIPData.push(row);
    }
    this.UnknownIPData = new MatTableDataSource(this.UIPData);
  }

  generateBankData(BankRows: number) {
    for (let i = 1; i <= BankRows; i++) {
      const row = {
        CreatedDate: `CreatedDate ${i}`,
        BankID: `BankID ${i}`,
        BankName: `BankName ${i}`,
        LastSeen: `LastSeen ${i}`,
        RoutingNumber: `RoutingNumber ${i}`,
        AccountNumber: `AccountNumber ${i}`,
        BankStatus: `BankStatus ${i}`,
        VMSID: `VMSID ${i}`,
      };
      this.BankData.push(row);
    }
    this.BankDetailsData = new MatTableDataSource(this.BankData);
  }

  generateDocuSign(DSRows: number) {
    for (let i = 1; i <= DSRows; i++) {
      const row = {
        CreatedDate: `CreatedDate ${i}`,
        EnvelopeNumber: `EnvelopeNumber ${i}`,
        Status: `Status ${i}`,
        SentAge: `SentAge ${i}`,
        ID: `ID ${i}`,
      };
      this.DSData.push(row);
    }
    this.DocuSignData = new MatTableDataSource(this.DSData);
  }

  generatePayments(PayRows: number) {
    for (let i = 1; i <= PayRows; i++) {
      const row = {
        CreatedDate: `CreatedDate ${i}`,
        PaymentCompletedDate: `PaymentCompletedDate ${i}`,
        PaymentID: `PaymentID ${i}`,
        PaymentType: `PaymentType ${i}`,
        PaymentTotal: `PaymentTotal ${i}`,
        PaymentClientName: `PaymentClientName ${i}`,
        PaymentStatus: `PaymentStatus ${i}`,
      };
      this.PayData.push(row);
    }
    this.PaymentsData = new MatTableDataSource(this.PayData);
  }

  generateOpportunities(OppRows: number) {
    for (let i = 1; i <= OppRows; i++) {
      const row = {
        Type: `Type ${i}`,
        Name: `Name ${i}`,
        StageName: `StageName ${i}`,
        CreatedDate: `CreatedDate ${i}`,
        CloseDate: `CloseDate ${i}`,
        ID: `ID ${i}`,
      };
      this.OppData.push(row);
    }
    this.OpportunitiesData = new MatTableDataSource(this.OppData);
  }

  generateOpportunityActivity(OppAcRows: number) {
    for (let i = 1; i <= OppAcRows; i++) {
      const row = {
        CreatedDate: `CreatedDate ${i}`,
        Subject: `Subject ${i}`,
        CallType: `CallType ${i}`,
        FIVE9ANI: `FIVE9ANI ${i}`,
        FIVE9SessionID: `FIVE9SessionID ${i}`,
        FIVE9DNIS: `FIVE9DNIS ${i}`,
        FIVE9CallRecording: `FIVE9CallRecording ${i}`,
        FIVE9AgentName: `FIVE9AgentName ${i}`,
        Description: `Description ${i}`,
        ID: `ID ${i}`,
      };
      this.OppAcData.push(row);
    }
    this.OpportunityActivitiesData = new MatTableDataSource(this.OppAcData);
  }

  generateCases(CaseRows: number) {
    for (let i = 1; i <= CaseRows; i++) {
      const row = {
        CreatedDate: `CreatedDate ${i}`,
        CaseNumber: `CaseNumber ${i}`,
        Origin: `Origin ${i}`,
        VCProblem: `VCProblem ${i}`,
        VCIssue: `VCIssue ${i}`,
        VCResolution: `VCResolution ${i}`,
      };
      this.CaseData.push(row);
    }
    this.CasesData = new MatTableDataSource(this.CaseData);
  }

  generateCaseEmails(CaseEmRows: number) {
    for (let i = 1; i <= CaseEmRows; i++) {
      const row = {
        CreatedDate: `CreatedDate ${i}`,
        FromAddress: `FromAddress ${i}`,
        ToAddress: `ToAddress ${i}`,
        FromName: `FromName ${i}`,
        CCAddress: `CCAddress ${i}`,
        BCCAddress: `CCAddress ${i}`,
        TextBody: `CCAddress ${i}`,
        ID: `CCAddress ${i}`,
      };
      this.CaseEmData.push(row);
    }
    this.CaseEmailsData = new MatTableDataSource(this.CaseEmData);
  }

  generateCaseActivity(CaseAcRows: number) {
    for (let i = 1; i <= CaseAcRows; i++) {
      const row = {
        CreatedDate: `CreatedDate ${i}`,
        Subject: `Subject ${i}`,
        CallType: `CallType ${i}`,
        Type: `Type ${i}`,
        FIVE9DNIS: `FIVE9DNIS ${i}`,
        FIVE9ANI: `FIVE9ANI ${i}`,
        Description: `Description ${i}`,
      };
      this.CaseAcData.push(row);
    }
    this.CaseActivitiesData = new MatTableDataSource(this.CaseAcData);
  }

  generateAccountActivity(AccountAcRows: number) {
    for (let i = 1; i <= AccountAcRows; i++) {
      const row = {
        CreatedDate: `CreatedDate ${i}`,
        Subject: `Subject ${i}`,
        CallType: `CallType ${i}`,
        FIVE9ANI: `FIVE9ANI ${i}`,
        FIVE9DNIS: `FIVE9DNIS ${i}`,
        FIVE9CallRecording: `FIVE9CallRecording ${i}`,
        FIVE9AgentName: `FIVE9AgentName ${i}`,
        FIVE9SessionID: `FIVE9SessionID ${i}`,
        Description: `Description ${i}`,
        WhatID: `WhatID ${i}`,
      };
      this.AccountAcData.push(row);
    }
    this.AccountActivityHistoryData = new MatTableDataSource(this.AccountAcData);
  }

  generateInboundEmails(InboundEmRows: number) {
    for (let i = 1; i <= InboundEmRows; i++) {
      const row = {
        CreatedDate: `CreatedDate ${i}`,
        FromAddress: `FromAddress ${i}`,
        ToAddress: `ToAddress ${i}`,
        FromName: `FromName ${i}`,
        CCAddress: `CCAddress ${i}`,
        BCCAddress: `BCCAddress ${i}`,
        TextBody: `TextBody ${i}`,
      };
      this.InboundEmData.push(row);
    }
    this.InboundEmailsData = new MatTableDataSource(this.InboundEmData);
  }

  generateDisposition(DispRows: number) {
    for (let i = 1; i <= DispRows; i++) {
      const row = {
        DispositionDate: `DispositionDate ${i}`,
        Disposition: `Disposition ${i}`,
        Verification: `Verification ${i}`,
        FraudRiskScore: `FraudRiskScore ${i}`,
        CaseOwner: `CaseOwner ${i}`,
        IPAddress: `IPAddress ${i}`,
        Email: `Email ${i}`,
      };
      this.DispositionData.push(row);
    }
    this.DispositionHistoryData = new MatTableDataSource(this.DispositionData);
  }

}
