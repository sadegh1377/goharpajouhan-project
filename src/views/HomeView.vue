<template>
    <div id="HomeView" class="mx-auto mt-8">
        <h1 class="mb-2">کارمندان</h1>
        <v-expansion-panels>
            <v-expansion-panel
                v-for="(employee,index) in employees " :key="index"
            >
                <v-expansion-panel-header>{{ employee.firstName + ' ' + employee.lastName }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <EmployeeForm @removedEmployee="removeFromEmployee"
                                  :employeeId="employee.id"
                                  :isEdit="true"/>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-container class="mt-5 mb-10">
            <v-row align="center" justify="center">
                <v-btn
                    class="addEmployeeBtn white--text"
                    @click="showAddEmployee"
                >افزودن کارمند
                </v-btn>
            </v-row>
        </v-container>
        <v-container v-if="addEmployeeShown" class="addEmployeeContainer rounded mb-10">
            <fieldset class="addEmployeeBorder pa-4 rounded">
                <legend class="mr-4 px-4"><h2>افزودن کاربر</h2></legend>
                <EmployeeForm
                    @addEmployee="addEmployee"
                    @cancel="cancel"
                    :isEdit="false" class=""/>
            </fieldset>
        </v-container>

    </div>
</template>

<script>
import EmployeeForm from "@/components/EmployeeForm.vue";
import {employeesMixins} from "@/mixins/employeesMixins";

export default {
    name: 'HomeView',
    mixins: [employeesMixins],
    components: {EmployeeForm},
    data() {
        return {
            employees: [],
            panel: [],
            addEmployeeShown: false,
        }
    },
    methods: {
        /**
         * this method makes addEmployee container to open.
         */
        showAddEmployee() {
            this.addEmployeeShown = true
        },
        /**
         * this method makes addEmployee container to close.
         */
        cancel() {
            this.addEmployeeShown = false
        },

        /**
         * this method first check that firstName and lastName are valid then
         * call sanitizeEmployee method then make a https request to employee
         * get api and push the response to employees array.
         */
        addEmployee(employeeObject) {
            if (employeeObject.firstName === null || employeeObject.firstName === "" ||
                employeeObject.lastName === null || employeeObject.lastName === "") {
                return
            }
            // console.log(employeeObject)
            let sanitizeEmployee = this.sanitizeEmployeeObject(employeeObject)
            console.log(sanitizeEmployee)
            this.$https.post('employee', {
                firstName: sanitizeEmployee.firstName,
                lastName: sanitizeEmployee.lastName,
                email: sanitizeEmployee.email,
                dateOfBirth: sanitizeEmployee.dateOfBirth,
                family: sanitizeEmployee.family
            }).then((res) => {
                console.log(res.data)
                this.employees.push(res.data)
                console.log(this.employees)
            }).catch((err) => {
                console.log(err)
            })
        },
        /**
         * this method first find the index of removed object and then
         * delete that object from employees array.
         */
        removeFromEmployee(id) {
            const index = this.employees.findIndex(member => member.id === id);
            this.employees.splice(index, 1)
        }
    },
    created() {
        /**
         * to get the employees when the page is created
         * making a https request to get api and then
         * equalize employees array to response.
         */
        this.$https.get('employee').then((res) => {
            this.employees = res.data
        }).catch((err) => {
            console.log(err)
        })
    }
}
</script>
<style scoped>
#HomeView {
    width: 60vw;
}

.addEmployeeContainer {
    background-color: white;
}

.addEmployeeBorder {
    border: 1px #b9b9b9 solid !important;
}
</style>
