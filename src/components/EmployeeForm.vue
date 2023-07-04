<template>
    <div id="EmployeeForm">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-container class="mb-2" v-if="isEdit">
                <v-row align="center"
                       justify="end"
                >
                    <v-btn class="deleteIcon py-4 px-0" x-small
                           @click="removeEmployee(employeeId)">
                        <v-icon class="white--text rounded">mdi-trash-can-outline</v-icon>
                    </v-btn>
                </v-row>
            </v-container>
            <v-container>
                <v-row>
                    <v-col
                        class="pr-0"
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="employeeObject.firstName"
                            :counter="15"
                            :rules="nameRules"
                            label="نام"
                            outlined
                            dense
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col
                        class="pl-0"
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="employeeObject.lastName"
                            :counter="15"
                            :rules="nameRules"
                            label="نام خانوادگی"
                            outlined
                            dense
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        class="pr-0"
                        cols="12"
                        md="6">
                        <v-menu
                            ref="employeeMenu"
                            v-model="employeeMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="employeeObject.dateOfBirth"
                                    label="تاریخ تولد (کلیک کنید)"
                                    append-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    outlined
                                    dense
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="employeeObject.dateOfBirth"
                                :active-picker.sync="activePicker"
                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                min="1950-01-01"
                                @change="saveEmployeeMenu"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col
                        class="pl-0"
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                            v-model="employeeObject.email"
                            :rules="emailRules"
                            label="ایمیل"
                            outlined
                            dense
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <fieldset class="familyMembers rounded mb-8">
                <legend class="familyMembersHeader mr-4 px-4">
                    <h3>اعضای خانواده</h3>
                </legend>

                <fieldset class="familyMembersCard rounded mx-auto my-5"
                          v-for="(member,index) in employeeObject.family" :key="index">
                    <legend class="familyMembersHeader mr-4 px-4">
                        <span class="familyMembersNumber">#{{ index + 1 }}</span>
                        <v-btn class="deleteIcon py-4 px-0 mr-5"
                               @click="removeFamilyMember(index)"
                               x-small>
                            <v-icon class="white--text rounded">mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </legend>
                    <v-container class="px-3">
                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="member.firstName"
                                    :counter="15"
                                    :rules="nameRules"
                                    label="نام"
                                    outlined
                                    dense
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-text-field
                                    v-model="member.lastName"
                                    :counter="15"
                                    :rules="nameRules"
                                    label="نام خانوادگی"
                                    outlined
                                    dense
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                md="6"
                            >
                                <v-menu
                                    ref="familyMemberMenu"
                                    :data-key="index"
                                    v-model="member.showBirthdayMenu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="member.dateOfBirth"
                                            label="تاریخ تولد (کلیک کنید)"
                                            append-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            outlined
                                            dense
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="member.dateOfBirth"
                                        :active-picker.sync="activePicker"
                                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                        min="1950-01-01"
                                        @change="saveFamilyMemberMenu(index)"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6">
                                <v-select
                                    v-model="member.relation"
                                    :items="items"
                                    label="نسبت"
                                    outlined
                                    dense
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </fieldset>
                <v-btn
                    @click="addFamilyMember"
                    class="addMemberBtn white--text mr-6 mb-5"
                >افزودن عضو
                </v-btn>
            </fieldset>
            <v-row align="center"
                   justify="space-between"
                   class="mb-1 px-3"
                   v-if="!isEdit">
                <v-btn
                    @click="addEmployee(employeeObject)"
                    class="addEmployeeBtn white--text"
                >افزودن
                </v-btn>
                <v-btn
                    @click="cancel"
                    class="cancelBtn white--text"
                >انصراف
                </v-btn>
            </v-row>
            <v-row
                align="center"
                justify="center"
                class="mb-1 px-3"
                v-if="isEdit">
                <v-btn
                    @click="updateEmployee(employeeId,employeeObject)"
                    class="addEmployeeBtn white--text"
                >بروزرسانی
                </v-btn>
            </v-row>
        </v-form>
    </div>
</template>

<script>
import {employeesMixins} from "@/mixins/employeesMixins";

export default {
    name: "EmployeeForm",
    mixins: [employeesMixins],
    props: {
        isEdit: {
            type: Boolean,
            require: true
        },
        employeeId: {
            type: String,
            require: false
        }
    },
    data() {
        return {
            employeeObject: {
                firstName: null,
                lastName: null,
                dateOfBirth: null,
                email: null,
                family: [
                    {
                        firstName: null,
                        lastName: null,
                        dateOfBirth: null,
                        relation: null,
                    }
                ]
            },
            activePicker: null,
            employeeMenu: false,
            familyMemberMenu: false,
            date: null,
            valid: true,
            nameRules: [
                v => !!v || 'نام الزامی است',
                v => (v && v.length <= 15) || 'نام باید کمتر از 15 کاراکتر باشد',
            ],
            emailRules: [
                v => !!v || 'ایمیل الزامی است',
                v => /.+@.+\..+/.test(v) || 'ایمیل باید معتبر باشید',
            ],
            select: null,
            items: [
                'همسر',
                'فرزند دختر',
                'فرزند پسر',
            ],
        }
    },
    watch: {
        employeeMenu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
        "employeeObject.family"(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    methods: {
        /**
         * this method emit an event for addEmployee.
         */
        addEmployee(employeeObject) {
            this.$emit('addEmployee', employeeObject)
        },
        /**
         * this method first delete the employee object by id by
         * make a https request to delete api and then emit an
         * event to we can delete the object locally from the
         * homeView component.
         */
        removeEmployee(id) {
            this.$https.delete(`employee/${id}`).then((res) => {
                console.log(res)
                this.$emit('removedEmployee', id)
            }).catch((err) => {
                console.log(err)
            })
        },
        /**
         * this method first check that firstName and lastName are valid then
         * call sanitizeEmployee method then make a https request to employee
         * put api for the chosen id and console.log the response.
         */
        updateEmployee(id, employeeObject) {
            if (this.employeeObject.firstName === null || this.employeeObject.firstName === '' ||
                this.employeeObject.lastName === null || this.employeeObject.lastName === '') {
                return
            }
            let sanitizeEmployee = this.sanitizeEmployeeObject(employeeObject)

            this.$https.put(`employee/${id}`, {
                firstName: sanitizeEmployee.firstName,
                lastName: sanitizeEmployee.lastName,
                email: sanitizeEmployee.email,
                dateOfBirth: sanitizeEmployee.dateOfBirth,
                family: sanitizeEmployee.family
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })

        },
        /**
         * this method first make sure that the id is defined and then
         * make a https request to get employees by id api and then
         * split the name property in family and create to new property
         * called firstName and lastName and delete th name.
         * for the reactivity set the property on employeeObject.
         */
        getEmployeeById(id) {
            if (id === undefined) {
                return
            }
            this.$https.get(`employee/${id}`).then((res) => {
                let data = res.data
                data.family.forEach((member) => {
                    let name = member.name.split('-')
                    member.firstName = name[0]
                    member.lastName = name[1]
                    delete member.name
                })
                this.$set(this.employeeObject, 'firstName', data.firstName)
                this.$set(this.employeeObject, 'lastName', data.lastName)
                this.$set(this.employeeObject, 'email', data.email)
                this.$set(this.employeeObject, 'dateOfBirth', data.dateOfBirth)
                this.$set(this.employeeObject, 'family', data.family)
            }).catch((err) => {
                console.log(err)
            })
        },
        /**
         * this method calls the save method by reference on v-menu for employee
         */
        saveEmployeeMenu(date) {
            this.$refs.employeeMenu.save(date)
        },
        /**
         * this method calls the save method by reference on v-menu for employee
         * family member.
         */
        saveFamilyMemberMenu(index, date) {
            const saving = this.$refs['familyMemberMenu'].find(
                el => el.$attrs['data-key'] === index
            );
            saving.save(date)
        },
        /**
         * this method push a new object on employeeObject family property.
         */
        addFamilyMember() {
            this.employeeObject.family.push(
                {
                    firstName: null,
                    lastName: null,
                    dateOfBirth: null,
                    relation: null
                })
        },
        /**
         * this method delete an object by index on employeeObject family property.
         */
        removeFamilyMember(index) {
            this.employeeObject.family.splice(index, 1)
        },
        /**
         * this method reset the employeeObject when cancel method called.
         * and emit an event
         */
        cancel() {
            this.employeeObject = {
                firstName: null,
                lastName: null,
                birthDay: null,
                email: null,
                family: [
                    {
                        firstName: null,
                        lastName: null,
                        dateOfBirth: null,
                        relation: null,
                    }
                ]
            }
            this.$emit('cancel')
        }
    },
    created() {
        /**
         * call getEmployeeById method to get the employee object first handed
         * from the api.
         */
        this.getEmployeeById(this.employeeId)
    }
}

</script>

<style>
#EmployeeForm {
    background-color: white;
}

.familyMembers {
    border: 1px #b9b9b9 solid;
}

.familyMembersHeader {
    background: white;
}

.familyMembersNumber {
    font-size: 25px;
}

.familyMembersCard {
    border: 1px #b9b9b9 solid;
    width: 50vw;
}

.deleteIcon {
    background-color: #E9003F !important;
    cursor: pointer;
}

.addMemberBtn {
    background-color: #464AFD !important;
}

.addEmployeeBtn {
    background-color: #4CA845 !important;
}

.cancelBtn {
    background-color: #6C757C !important;
}
</style>