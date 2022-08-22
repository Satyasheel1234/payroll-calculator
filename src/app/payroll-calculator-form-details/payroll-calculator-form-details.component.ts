import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { InteropObservable } from "rxjs";
import { Chart } from "chart.js";

const percentageCoffecient = 100;
const incrementPercentForMidLevel = 20;
const incrementPercentForSeniorLevel = 40;
const incrementPercentForManagerLevel = 60;
const MaxBasicIncome = 36000;
const taxRateForExtraIncomeRange1 = 50;
const taxRateForExtraIncomeRange2 = 70;
const developerBasicSalary = 30000;
const teacherBasicSalary = 27000;
const cashierBasicSalary = 25000;

@Component({
  selector: "app-payroll-calculator-form-details",
  templateUrl: "./payroll-calculator-form-details.component.html",
  styleUrls: ["./payroll-calculator-form-details.component.scss"]
})
export class PayrollCalculaterFormDetailsComponent implements OnInit {
  SalaryForm: FormGroup;
  fromData: any;
  netSalary: any;
  workExperience: any;
  taxRate: number;
  taxedValueOnHighIncome: number;
  taxedValueOnBasicIncome: number;
  totalTax: number;
  grossSalary: number;
  profession: string;
  city: string;
  incomeYear: number;
  PiChart = [];
  isShown: boolean = false;

  constructor() {}

  ngOnInit() {
    this.SalaryForm = new FormGroup({
      experience: new FormControl(1),
      profession: new FormControl("developer"),
      location: new FormControl("stockholm"),
      incomeyear: new FormControl(2019)
    });
  }
  hidePiChart() {
    this.isShown = true;
  }
  onSubmit() {
    this.fromData = this.SalaryForm.value;
    //console.log(this.fromData.value);
    this.salary();
  }

  salary() {
    this.workExperience = this.SalaryForm.value.experience;
    this.profession = this.SalaryForm.value.profession;
    this.city = this.SalaryForm.value.location;
    this.incomeYear = this.SalaryForm.value.incomeyear;

    this.grossSalary = this.CalculateSalaryIncrement(this.workExperience, this.profession);
    this.totalTax = this.CalculateTax(this.grossSalary, this.city, this.incomeYear);
    this.netSalary = this.grossSalary - this.totalTax;

    this.PiChart = new Chart("piChart", {
      type: "pie",
      data: {
        labels: ["Netsalary", "TotalTax"],
        datasets: [
          {
            label: "My First Dataset",
            data: [this.netSalary, this.totalTax],
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
            hoverOffset: 4
          }
        ]
      }
    });
  }

  CalculateSalaryIncrement(workExperience: number, professionData: string): number {
    console.log("Inside calculate Salary", workExperience);
    let incomeByProfession=this.GetBasicSalaryByProfession(professionData);

    if (workExperience > 0 && workExperience <= 3) return this.GetBasicSalaryByProfession(professionData) + 0;
    else if (workExperience >= 4 && workExperience <= 7)
      return (
        incomeByProfession +
        (incomeByProfession * incrementPercentForMidLevel) / percentageCoffecient
      );
    else if (workExperience >= 8 && workExperience <= 10)
      
    return (
      incomeByProfession +
        (incomeByProfession * incrementPercentForSeniorLevel) / percentageCoffecient
      );

    else     
      return (incomeByProfession + (incomeByProfession * incrementPercentForManagerLevel) / percentageCoffecient);    
  }

  GetBasicSalaryByProfession(professionData: string): number {
    switch (professionData.toLowerCase()) {
      case "developer":
        return developerBasicSalary;
      case "cashier":
        return cashierBasicSalary;
      case "teacher":
        return teacherBasicSalary;
    }
  }

  CalculateTax(basicSalary: any, city: string, year: number): number {
    if (basicSalary <= 36000) {
      return this.GetTaxOnBasicIncome(basicSalary, city, year);
    } else {
      return this.GetTaxOnBasicIncome(basicSalary, city, year) + this.GetTaxOnHighIncome(basicSalary);
    }
  }

  GetTaxOnBasicIncome(basicSalary: number, city: string, year: number): number {
    switch (city.toLowerCase()) {
      case "stockholm":
        if (year == 2019) this.taxRate = 30;
        else if (year == 2020) this.taxRate = 29;
        return this.CalculateTaxOnIncome(basicSalary, this.taxRate);

      case "gothenburg":
        if (year == 2019) this.taxRate = 25;
        else if (year == 2020) this.taxRate = 22;
        return this.CalculateTaxOnIncome(basicSalary, this.taxRate);

      default:
        break;
    }
  }

  GetTaxOnHighIncome(basicSalary: number): number {
    let extraIncome = basicSalary - MaxBasicIncome;

    if (extraIncome > 0 && extraIncome <= 9000) {
      return this.CalculateTaxOnIncome(extraIncome, taxRateForExtraIncomeRange1);
    }
    if (extraIncome > 9000) {
      return (
        this.CalculateTaxOnIncome(9000, taxRateForExtraIncomeRange1) +
        this.CalculateTaxOnIncome(basicSalary - 45000, taxRateForExtraIncomeRange1)
      );
    } else {
    }
  }

  CalculateTaxOnIncome(income: number, taxRate: number): number {
    return (income * taxRate) / percentageCoffecient;
  }
}
