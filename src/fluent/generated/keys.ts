import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    appointment_citizen_create: {
                        table: 'sys_security_acl'
                        id: 'ad55c9cc7d424849bfa085570464c94b'
                    }
                    appointment_citizen_read: {
                        table: 'sys_security_acl'
                        id: 'dcf61022ddd743b2baf6b185cfb7ae31'
                    }
                    appointment_provider_read: {
                        table: 'sys_security_acl'
                        id: 'dafacc0b1a144760ba94e44d4c14c54b'
                    }
                    appointment_provider_write: {
                        table: 'sys_security_acl'
                        id: '659bb06542ae42ea867fa3abf19b3b67'
                    }
                    appointment_staff_read: {
                        table: 'sys_security_acl'
                        id: '0de97824291b465a9e06b42da3828580'
                    }
                    appointment_staff_write: {
                        table: 'sys_security_acl'
                        id: '9a223d578e8f45c08b6fa99aedc96b83'
                    }
                    auth_api: {
                        table: 'sys_ws_definition'
                        id: '35f8fc3a60e94fb7a74a4420be3187c0'
                        deleted: true
                    }
                    auth_api_v1: {
                        table: 'sys_ws_version'
                        id: '1a7012c0584c4d37b3156ce8dfbde6ab'
                        deleted: true
                    }
                    auth_login_route: {
                        table: 'sys_ws_operation'
                        id: '3678fc1bf2e643abb6f0b6fd6b3707c1'
                        deleted: true
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '5756cd4059b54924833b8604f2e9b59d'
                    }
                    clinic_citizen_read: {
                        table: 'sys_security_acl'
                        id: 'f5979444c9834eb68afb93540251d6d2'
                    }
                    clinic_provider_create: {
                        table: 'sys_security_acl'
                        id: '4a7b930b564848fa8ed447fb53b2de2f'
                    }
                    clinic_provider_read: {
                        table: 'sys_security_acl'
                        id: '52d4e0cde9f0499d8b13f539d8b35fcb'
                    }
                    clinic_provider_write: {
                        table: 'sys_security_acl'
                        id: '00b88c0e6758468ab1d05045d9e7ea9a'
                    }
                    clinic_staff_read: {
                        table: 'sys_security_acl'
                        id: '5c82a54ee7924d1ba8fb027d007ccde3'
                    }
                    clinic_staff_write: {
                        table: 'sys_security_acl'
                        id: 'a86c4f3e7e3c4142a42a6cc7b15e3a1b'
                    }
                    ebakuna_auth_api: {
                        table: 'sys_ws_definition'
                        id: 'cb514ae8318a4d7386017df2b51eb062'
                    }
                    ebakuna_auth_login_route: {
                        table: 'sys_ws_operation'
                        id: '5fcf8d40c0db49d6a91876a45d8c2d5e'
                    }
                    ebakuna_auth_version_1: {
                        table: 'sys_ws_version'
                        id: '40a261368fda4ef3aa7b92e2093d0509'
                    }
                    medical_citizen_create: {
                        table: 'sys_security_acl'
                        id: 'c3cc61be402740ccbdd91ea43ad199c1'
                    }
                    medical_citizen_read: {
                        table: 'sys_security_acl'
                        id: '3627000ad0b24b81a2bb5570d2e8e405'
                    }
                    medical_provider_read: {
                        table: 'sys_security_acl'
                        id: '233d7326d776413a9a6104c196ed6fdc'
                    }
                    medical_staff_create: {
                        table: 'sys_security_acl'
                        id: 'ebe528d3587240c782372780862e1456'
                    }
                    medical_staff_read: {
                        table: 'sys_security_acl'
                        id: 'dc58a7cdf03643628c8c22df9c1e75bf'
                    }
                    medical_staff_write: {
                        table: 'sys_security_acl'
                        id: 'b0ee0e091b1f45f9818f59afbdb63bbf'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '91f0aa482d3e42f99a2b275f99998235'
                    }
                    schedule_citizen_read: {
                        table: 'sys_security_acl'
                        id: '9ed6f0103a5e47c3bcf6b4ff0dd1a0fb'
                    }
                    schedule_provider_create: {
                        table: 'sys_security_acl'
                        id: '452d8db59f8b4b0e98174f721410567b'
                    }
                    schedule_provider_read: {
                        table: 'sys_security_acl'
                        id: '7b1b1c5234044ecfbad9d4361b5ae20b'
                    }
                    schedule_provider_write: {
                        table: 'sys_security_acl'
                        id: '1c8f4d42629b489991b11ddeecc154d3'
                    }
                    schedule_staff_read: {
                        table: 'sys_security_acl'
                        id: '464ef83ba1cb4d89bd9018267606b9b4'
                    }
                    schedule_staff_write: {
                        table: 'sys_security_acl'
                        id: '60f23c4682544c54969b40263ccb7200'
                    }
                    'src_server_auth-handler_js': {
                        table: 'sys_module'
                        id: '433832146696420a9ac9edbf633a1f91'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '013ded94873a4a3e98e1d0ecfd57f3b2'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '02d9541c11a5454983d8895d9c76645d'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'end_date_time'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '03b08f851d584eb4bda2ae963b6349c4'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'toong'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '04bfee586e6d43dbac0ec8393a4d48b7'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'cogon_pardo'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '053bb1e41f9344f9909020224a861bf5'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '05e3d4cd7a364db3bf84caa9a50b0374'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'budla_an'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '06ac77ce29fa413c86fe6de6476b79eb'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0c5faffd9d0c43b9ae4a98ce7217bde1'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_covid_contact'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0c7f93497d53432eb56a5b5d462fb4e3'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'clinic'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0cc8255961c1492d9cea753530d4d931'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0d342a27fd984c67ac6a7882a927fe69'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'kamagayan'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0fb7d162b4274e1b9cffea09ee525767'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_fever_cough_cold'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '10248e0becc84719b582888dc0fde735'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'paril'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1185d294ada54512911f5cabd135e145'
                        key: {
                            sys_security_acl: '659bb06542ae42ea867fa3abf19b3b67'
                            sys_user_role: {
                                id: '6ecda2a19dc742ca8e179aa202aca41c'
                                key: {
                                    name: 'x_2009786_vaccinat.provider'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '13365e93d33644b7bec39e2bdf0d53ee'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '13536fb7494343779298894790d681f4'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'provider'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '141d429d669246a484227c27c6be5cbe'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'sputnik_v'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1496486837b84036b0e76af2301e5b11'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pahina_central'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '166ac297b8724268ac87adfe117c7ddf'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'appointment'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '16a8f152c35407103b31b1f1b401319a'
                        key: {
                            sys_ui_section: {
                                id: '9ea8f512c3d007103b31b1f1b4013159'
                                key: {
                                    name: 'x_2009786_vaccinat_appointment'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '16a8f152c35407103b31b1f1b401319f'
                        key: {
                            sys_ui_section: {
                                id: '9ea8f512c3d007103b31b1f1b4013159'
                                key: {
                                    name: 'x_2009786_vaccinat_appointment'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'status'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '1754c14088044bd4a81ed07c99acb080'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'dose_number'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1985746e92fb4001998391cf1352230e'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '19a0714ff6524dbba2ab12d5ee3a646f'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1a850de2afe84850b953ae3f175b6587'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'status'
                            value: 'no_show'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '1aa8f152c35407103b31b1f1b401319d'
                        key: {
                            sys_ui_section: {
                                id: '9ea8f512c3d007103b31b1f1b4013159'
                                key: {
                                    name: 'x_2009786_vaccinat_appointment'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1d0e1355a53144778d7a600e0f1a3325'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'san_antonio'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d6aebdc7f274cc0958498cd4ee1e4c6'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'contact_number'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1d708198b00c4f77929c16ea7e708e98'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'babag'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '1da271ea884a402eb8ff128e4113085c'
                        key: {
                            name: 'x_2009786_vaccinat/main.js.map'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1de26caa41d14c7282a4e9a6b4300b58'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'binaliw'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1dedc16899da41e08752b7915816f4e3'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'dose_number'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1e216339991d41ff8266948f126223e8'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'pfizer_biontech'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '1e4fd8781efc46128f492e49e9476378'
                        key: {
                            application_file: '8f98bee2834640c094e5a3bc32e73dd6'
                            source_artifact: 'd64a464efb634b378c7dd3fc5f9f0ccd'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '1ea8f152c35407103b31b1f1b401319b'
                        key: {
                            sys_ui_section: {
                                id: '9ea8f512c3d007103b31b1f1b4013159'
                                key: {
                                    name: 'x_2009786_vaccinat_appointment'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'citizen'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1ebdf09cd5ad47bebcc1c5c38d8c7855'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'buhisan'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '1f3f56c5392141c5b9a717a97e84232d'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1fc63597b0d64633b38898326f246c99'
                        key: {
                            sys_security_acl: 'dafacc0b1a144760ba94e44d4c14c54b'
                            sys_user_role: {
                                id: '6ecda2a19dc742ca8e179aa202aca41c'
                                key: {
                                    name: 'x_2009786_vaccinat.provider'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '264388d258dc4c7ca2ce84b8ac334415'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'taboan'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2690b50285674af0a067aa70003385bb'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_fever_cough_cold'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2748e99a834c48128294f273ce0db84a'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'dose_number'
                            value: 'second_dose'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '27f724e6be574d728c3feb442e93ee92'
                        key: {
                            sys_security_acl: '60f23c4682544c54969b40263ccb7200'
                            sys_user_role: {
                                id: '731b1a2aefa54d09841fe8a7702840b5'
                                key: {
                                    name: 'x_2009786_vaccinat.clinic_staff'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2890420d2947481d849a0697ba1bb6f4'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_type'
                            value: 'cho'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '295475d9036f4290b5a0b5320f0228fb'
                        key: {
                            sys_security_acl: '452d8db59f8b4b0e98174f721410567b'
                            sys_user_role: {
                                id: '6ecda2a19dc742ca8e179aa202aca41c'
                                key: {
                                    name: 'x_2009786_vaccinat.provider'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '296c4be6bda04a6397704bd4ca1e075c'
                        key: {
                            sys_security_acl: '0de97824291b465a9e06b42da3828580'
                            sys_user_role: {
                                id: '731b1a2aefa54d09841fe8a7702840b5'
                                key: {
                                    name: 'x_2009786_vaccinat.clinic_staff'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '29a1b0e3bda5477f8dcaabd1a800278f'
                        key: {
                            name: 'x_2009786_vaccinat.citizen'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2ac13f0519aa4b438e3c3079437e2cfa'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'citizen'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2bd1f5f3830242eca79e8ff11bd59639'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'buot_taup_pardo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2bdfd664393f43c0ab1cb0f448a44a9b'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'cogon_ramos'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2c3355b0014e4ea3984e912596b8e9ec'
                        key: {
                            sys_security_acl: '9a223d578e8f45c08b6fa99aedc96b83'
                            sys_user_role: {
                                id: '731b1a2aefa54d09841fe8a7702840b5'
                                key: {
                                    name: 'x_2009786_vaccinat.clinic_staff'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '2d05d8c8b9bf481888d5e6088f3b0c1a'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2de2e26c1b39491caf96c3ad25740212'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sudlon_ii'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2e74e1f31add438199effe658bfb5031'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sibugay'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2ea72123e5d641e3aae734fa89ef35d6'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'address'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2ea8bddac39007103b31b1f1b401318c'
                        key: {
                            sys_ui_section: {
                                id: 'eaa8bddac39007103b31b1f1b4013187'
                                key: {
                                    name: 'x_2009786_vaccinat_clinic'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2ff6623f3e874ae7a2ea416d95662f98'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'luz'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '301fe5b332454edfbd9d0b4684c217fe'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'status'
                            value: 'active'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '30aa5396d9a842cdbc8b7988588f2c4f'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'bulacao'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '320d6391d60a4d7d898a0d3d5a69687d'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'guba'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '322b8b66b02c4ac6b2cfe06e6e15d8c6'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '33a6ee8416e145cfb5157cc5028c7588'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'schedule_slot'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '33a8b552c35407103b31b1f1b4013115'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hd_recent_vaccine'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '33a8b552c35407103b31b1f1b401311c'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '33a8b552c35407103b31b1f1b4013153'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'citizen'
                            position: '16'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '356f0edfd3c44e93b0f8cb2bbcac67da'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'calamba'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3653ea8c6a5f4be9862a432121dbb564'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sirao'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '36669bb7b8824f79b903ffa85123f0e4'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'remaining_slots'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3787652be9f34bbba9367a020c83c004'
                        key: {
                            sys_security_acl: 'b0ee0e091b1f45f9818f59afbdb63bbf'
                            sys_user_role: {
                                id: '731b1a2aefa54d09841fe8a7702840b5'
                                key: {
                                    name: 'x_2009786_vaccinat.clinic_staff'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '37a8b552c35407103b31b1f1b401311a'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3ba8b552c35407103b31b1f1b4013118'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3ba8b552c35407103b31b1f1b401311f'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '14'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '3ba8f152c35407103b31b1f1b40131fc'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            caption: 'NULL'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '3d7b4a41a1934de7ab6dde1400ee8df8'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3f52bff68544436ab7801506e5d8a906'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3f674d9688a148528a89f56e5e4739e0'
                        key: {
                            sys_security_acl: '4a7b930b564848fa8ed447fb53b2de2f'
                            sys_user_role: {
                                id: '6ecda2a19dc742ca8e179aa202aca41c'
                                key: {
                                    name: 'x_2009786_vaccinat.provider'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3fa8b552c35407103b31b1f1b4013116'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'consent_signed'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3fa8b552c35407103b31b1f1b401311d'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3fa8b552c35407103b31b1f1b4013154'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hd_pregnant_breastfeeding'
                            position: '18'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4101792c07a048e8bce5dff8dd204700'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_pregnant_breastfeeding'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '427eb6786bd347bfab9f47e8aa52dc85'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'status'
                            value: 'open'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4311b6f958504de58dbe7b475ce24b51'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'status'
                            value: 'inactive'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '433338a611b746f3b8253214fc80cf1c'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'mambaling'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4553316fd5a64ba89251f4b470b2d509'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'malubog'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '455ef00e93584c5085b07aa223858960'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4615a4633af34cc98f6ce1e3bd8de749'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'dose_number'
                            value: 'first_dose'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '479b74fd01da431bbfe4bb607ecfd61e'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'max_capacity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '47cdb92aab5247c4b6896ce0cb02a9aa'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'moderna'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '48453bbb14e048bb8d525a4516b21ef8'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'basak_san_nicolas'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: '4be21859bc95490da04f461d6c2089ba'
                        key: {
                            name: 'x_2009786_vaccinat/main'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4da7b847e64949edb4bda7e50da4e8f1'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'allergies'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4f74693a03694f0681a00698b45188dc'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'suba_san_nicolas'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4fcad0e6a63840de80867dce399cd2e0'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'reference_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4fe2da3697f64b9196c135a7ca44e892'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'san_roque'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '51b1fc4f795c42839946a1b9de07bf78'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'bonbon'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '53b64742f2f14fdcb6d11b6028a4ba54'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'quiot_pardo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '53e80c4a385242dc94992e600af21880'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pung_ol_sibugay'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '558fd421463a4a289c2d00b741917d56'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '56f0e8df63424538961bf0a6c34e4432'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '570c9404058e4f36ace62e0f02f5b863'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pahina_san_nicolas'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '57a3433c4dc041f6a3d6a94bd962420f'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'tagbao'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '5849ac683e0d4f37adbafe3b4fc0636a'
                        key: {
                            application_file: '1da271ea884a402eb8ff128e4113085c'
                            source_artifact: 'd64a464efb634b378c7dd3fc5f9f0ccd'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '58a9c1398f7e4866bc2b11ae039a8eca'
                        key: {
                            sys_security_acl: 'c3cc61be402740ccbdd91ea43ad199c1'
                            sys_user_role: {
                                id: '29a1b0e3bda5477f8dcaabd1a800278f'
                                key: {
                                    name: 'x_2009786_vaccinat.citizen'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '59c824214db548bebe290be90b54ad8f'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'kalunasan'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5bf2a76c05de4ff1a26d150379406ddd'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'schedule_slot'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5c1501d63d1d41a59eb6e94f7747e618'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5d4bed5af4d248e1a9221ae3eae30bfc'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5e70739535de42dab239162c89798bfe'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_type'
                            value: 'private'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5f3649f433bf4dd5a560f7de91296509'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'lorega_san_miguel'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5fe4f8d4496a44c29cbf7376a281521b'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '61f344f5e817480a9403e8ce984222de'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_type'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '62a83552c35407103b31b1f1b4013101'
                        key: {
                            sys_ui_section: {
                                id: 'eaa8bddac39007103b31b1f1b4013187'
                                key: {
                                    name: 'x_2009786_vaccinat_clinic'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '62ecd2d4c62347e5a214ad1ffb2006de'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'labangon'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '66a8f152c35407103b31b1f1b40131ff'
                        key: {
                            sys_ui_section: {
                                id: 'eaa8bddac39007103b31b1f1b4013187'
                                key: {
                                    name: 'x_2009786_vaccinat_clinic'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '67a8923d475d4b50b17e1f0681cd1501'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_covid_contact'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '681720531ee44d6a92ea8f0a134b7dd6'
                        key: {
                            sys_security_acl: '7b1b1c5234044ecfbad9d4361b5ae20b'
                            sys_user_role: {
                                id: '6ecda2a19dc742ca8e179aa202aca41c'
                                key: {
                                    name: 'x_2009786_vaccinat.provider'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6918a01d49b04b57a8a893dcc9f704c4'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_anaphylaxis_history'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6aa8f152c35407103b31b1f1b40131fd'
                        key: {
                            sys_ui_section: {
                                id: 'eaa8bddac39007103b31b1f1b4013187'
                                key: {
                                    name: 'x_2009786_vaccinat_clinic'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'barangay'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6aafbb946ffb490ab9080c010900d551'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6ac18bf559b74afa9cde2e744c5d8cfa'
                        key: {
                            sys_security_acl: 'f5979444c9834eb68afb93540251d6d2'
                            sys_user_role: {
                                id: '29a1b0e3bda5477f8dcaabd1a800278f'
                                key: {
                                    name: 'x_2009786_vaccinat.citizen'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6c523bca91044fdd8d71c235b9484a35'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'san_jose'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6c95940aee364ef0b6412b7a112b2722'
                        key: {
                            sys_security_acl: '1c8f4d42629b489991b11ddeecc154d3'
                            sys_user_role: {
                                id: '6ecda2a19dc742ca8e179aa202aca41c'
                                key: {
                                    name: 'x_2009786_vaccinat.provider'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6e4f990e466a4675a9acdaac684931af'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'day_as'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6ea83552c35407103b31b1f1b4013102'
                        key: {
                            sys_ui_section: {
                                id: 'eaa8bddac39007103b31b1f1b4013187'
                                key: {
                                    name: 'x_2009786_vaccinat_clinic'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'address'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '6ecda2a19dc742ca8e179aa202aca41c'
                        key: {
                            name: 'x_2009786_vaccinat.provider'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '70a82abface24da49788002658c20a02'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_type'
                            value: 'rhu'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7178d15bdab249839a20381c08f0bf42'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'symptoms'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '731b1a2aefa54d09841fe8a7702840b5'
                        key: {
                            name: 'x_2009786_vaccinat.clinic_staff'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '73a8b552c35407103b31b1f1b40131e2'
                        key: {
                            sys_ui_section: {
                                id: '3ba8f152c35407103b31b1f1b40131fc'
                                key: {
                                    name: 'x_2009786_vaccinat_schedule'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'clinic'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '73f7776fb5a54b3693ba289bdde84163'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sapangdaku'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7479d357deb54352ac00be5cb4f452d9'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'banilad'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '749ce70e8b3f486187687a60c1cbb0d5'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 't_padilla'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '74d9e57dda4c4cb182b82869571d5c67'
                        key: {
                            sys_security_acl: 'a86c4f3e7e3c4142a42a6cc7b15e3a1b'
                            sys_user_role: {
                                id: '731b1a2aefa54d09841fe8a7702840b5'
                                key: {
                                    name: 'x_2009786_vaccinat.clinic_staff'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '75a781896bc04e47aed54865ab8e4bcd'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'address'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7768723ad05a46c2968212d2a8ef3039'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '77a83552c35407103b31b1f1b40131dc'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '77a8b552c35407103b31b1f1b40131e0'
                        key: {
                            sys_ui_section: {
                                id: '3ba8f152c35407103b31b1f1b40131fc'
                                key: {
                                    name: 'x_2009786_vaccinat_schedule'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'end_date_time'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '7a1ee3ce6e1e4edcb4f9ff3fbbbdb0e2'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7ba8b552c35407103b31b1f1b40131e5'
                        key: {
                            sys_ui_section: {
                                id: '3ba8f152c35407103b31b1f1b40131fc'
                                key: {
                                    name: 'x_2009786_vaccinat_schedule'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7c3f0f42cee741ddb14cc0f361b3730b'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'apas'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7d426f57a98e4e7795b7f83601d9c184'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'citizen'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7df408f75e8f4eec852e6c63bbd73fe1'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'mabini'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7fa8b552c35407103b31b1f1b40131e3'
                        key: {
                            sys_ui_section: {
                                id: '3ba8f152c35407103b31b1f1b40131fc'
                                key: {
                                    name: 'x_2009786_vaccinat_schedule'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'max_capacity'
                            position: '5'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '83a08b0f84174db6b78a843a222e4efa'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '852a6a0eb061403891804230dd2b53ce'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'consent_signed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '873c54651b564aa39170a74149f9e479'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'cambinocot'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '87664ca91fb2461ebc1ae1867c421acd'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'zapatera'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8a74e9313c6b40ea83fb70f5925671bc'
                        key: {
                            sys_security_acl: '5c82a54ee7924d1ba8fb027d007ccde3'
                            sys_user_role: {
                                id: '731b1a2aefa54d09841fe8a7702840b5'
                                key: {
                                    name: 'x_2009786_vaccinat.clinic_staff'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8b7716204a84442b82497e62c08e2fd9'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'busay'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8c0325f2bc0d45b69eac0c9e867f1d5b'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8c3a491ebd4e40fd9cfd40d89c4b3a1c'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'covaxin'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8cda7d7af6214ea9b59b39fba1fc797d'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '8e2057fb1e804f98a27f578609af718b'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8f07856cffc34c1dbdfea9f43f190c4e'
                        key: {
                            sys_security_acl: 'ad55c9cc7d424849bfa085570464c94b'
                            sys_user_role: {
                                id: '29a1b0e3bda5477f8dcaabd1a800278f'
                                key: {
                                    name: 'x_2009786_vaccinat.citizen'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '8f98bee2834640c094e5a3bc32e73dd6'
                        key: {
                            endpoint: 'x_2009786_vaccinat_ebakuna_dashboard.do'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '911b4ceba20543d98794971e58a9d3ec'
                        key: {
                            sys_security_acl: '233d7326d776413a9a6104c196ed6fdc'
                            sys_user_role: {
                                id: '6ecda2a19dc742ca8e179aa202aca41c'
                                key: {
                                    name: 'x_2009786_vaccinat.provider'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '92a8f152c35407103b31b1f1b40131a0'
                        key: {
                            sys_ui_section: {
                                id: '9ea8f512c3d007103b31b1f1b4013159'
                                key: {
                                    name: 'x_2009786_vaccinat_appointment'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '93d55b677ba14917b8f5fbcdcbb77573'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'hippodromo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '941fa5f6023148d89123738ce4a06375'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pari_an'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '96a8f152c35407103b31b1f1b401319e'
                        key: {
                            sys_ui_section: {
                                id: '9ea8f512c3d007103b31b1f1b4013159'
                                key: {
                                    name: 'x_2009786_vaccinat_appointment'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'dose_number'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9719b1cf96c54703a2c83e8c20428873'
                        key: {
                            sys_security_acl: 'ebe528d3587240c782372780862e1456'
                            sys_user_role: {
                                id: '731b1a2aefa54d09841fe8a7702840b5'
                                key: {
                                    name: 'x_2009786_vaccinat.clinic_staff'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '98c6177fc0f347d8bbe850b882728a22'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '99af7c4fd6674732b2b8d68fe1ae371f'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'citizen'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9aa8f152c35407103b31b1f1b401319c'
                        key: {
                            sys_ui_section: {
                                id: '9ea8f512c3d007103b31b1f1b4013159'
                                key: {
                                    name: 'x_2009786_vaccinat_appointment'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'schedule_slot'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9aaf1d5a5f5c4de08b253120a18073cf'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'carreta'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '9c602017e9fe43759b6673c8cba16318'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '9ea8f512c3d007103b31b1f1b4013159'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            caption: 'NULL'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9f549ae380f1435a909310968d4baa2f'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'camputhaw'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a19d2e431a584071a5a7ea28d41e5293'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'astrazeneca'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a1d9eaca43da40de9f08ecb1fa254a00'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sudlon_i'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a20d0ffaf97b4f2c98793c051b50c45b'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pasil'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a3fd74e4d55d4d04986f20f843fbebe3'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'sinopharm'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a451d39897e4471aa7d633278fbb627c'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sawang_calero'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a47dee81e93a400b9564e16802a3a4fa'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'agsungot'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a53ecdd007874c15b184e087a83a42c8'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a795adb62af34799adf4bf506734f3a1'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'status'
                            value: 'confirmed'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a8d85ce95b824955aabd87652a828a1f'
                        key: {
                            sys_security_acl: '00b88c0e6758468ab1d05045d9e7ea9a'
                            sys_user_role: {
                                id: '6ecda2a19dc742ca8e179aa202aca41c'
                                key: {
                                    name: 'x_2009786_vaccinat.provider'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a8dcd64069f0450896bee67326b53434'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'follow_up_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'aad62a08b3b5466e841b7a64edd4c43d'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'kalubihan'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ab7ae1ff089847f4bbae377276073e71'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'lusaran'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'abd1337dfbdd4168bfdf7402c7f838f4'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'sinovac'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'af7812c7aaf449428b0a3fea0c11e9d8'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'bacayan'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'afcb5416b9e8480980ab97c59ce74502'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_pregnant_breastfeeding'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b2612ed50b78412d9146327cd626b7bb'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'johnson_johnson'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b26c483f28604ebc9c83892ce77ad794'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'status'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'b2b23e6b279849dab05c3609a2e18b18'
                        key: {
                            sys_security_acl: 'dc58a7cdf03643628c8c22df9c1e75bf'
                            sys_user_role: {
                                id: '731b1a2aefa54d09841fe8a7702840b5'
                                key: {
                                    name: 'x_2009786_vaccinat.clinic_staff'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b3a8b552c35407103b31b1f1b4013114'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hd_fever_cough_cold'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b3a8b552c35407103b31b1f1b401311b'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'appointment'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b3a8b552c35407103b31b1f1b4013152'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'follow_up_date'
                            position: '15'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b3f6844761794d90a21dbf8dc777edd3'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b61e5633ab354c7e809b871ccb88ce72'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sinsin'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b7a8b552c35407103b31b1f1b4013119'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'allergies'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b826a92b6690472a8a13c515aa52bd8c'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'san_nicolas_central'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b8b95bd86a5542b49e7fe19e6250a421'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'kasambagan'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b8d99408d2514c7f96af65b4eb700bb9'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'mabolo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b98ec4e6564b4acabb049d93f7ba660d'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'punta_princesa'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b9f51a9384ab4ac2af4ec5f86f1ea598'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'inayawan'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bba8b552c35407103b31b1f1b4013117'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hd_covid_contact'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bba8b552c35407103b31b1f1b401311e'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'symptoms'
                            position: '13'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bba8b552c35407103b31b1f1b4013155'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '19'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bc022d609223444da2de12af72cbe4b9'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'be453f494e614290bc8acaeefc8bbc2d'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'citizen'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bfa8b552c35407103b31b1f1b4013115'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bfa8b552c35407103b31b1f1b401311c'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'hd_anaphylaxis_history'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bfa8b552c35407103b31b1f1b4013153'
                        key: {
                            sys_ui_section: {
                                id: 'f3a83552c35407103b31b1f1b40131d7'
                                key: {
                                    name: 'x_2009786_vaccinat_medical_record'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '17'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c0e56c1d490c4055909145fbceb935c4'
                        key: {
                            sys_security_acl: '3627000ad0b24b81a2bb5570d2e8e405'
                            sys_user_role: {
                                id: '29a1b0e3bda5477f8dcaabd1a800278f'
                                key: {
                                    name: 'x_2009786_vaccinat.citizen'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c17a7d38f7d84fa49389dded4b45160a'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'taptap'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c1cc785018bc48ba91a4181aa059ef13'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c1fa8eb00e6c49da9fa79344f47740a8'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'consent_signed'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c3d4b32203e94f2f892a378aaa3c611f'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'santa_cruz'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c5ebf3dc2b5949f99d3cbef0a7d545bb'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c6003cee310142cbaa10705a3d4b892c'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'ermita'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c86b53501bbc4f8b84ea221bcb611761'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_recent_vaccine'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c94fdcb4c0bc4782b09090d9c21e1ba4'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'start_date_time'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c9613c0342db494a928ecd5ee4252bdd'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c967cc33b30f4a67bda71fda1d112016'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'start_date_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cb1d3516092a43f4b4c25ad56a03d79d'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cb86dfa9d10d4c8cad18b18f228d98ca'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'allergies'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ce2d074f8a134393831ed7757ba16a5e'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'tisa'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ce3abc3526694fe299702ee3f957a97f'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'kinasang_an_pardo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cef10ab670b84cd3b2be4b5a73d13d0d'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pulangbato'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cfe4741385204e13a65a2df9ab591ebf'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'provider'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd1773b8ebfe941aa90494c88bd69b9b8'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'remaining_slots'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd1b11da1973144d89cb3a34c0144d010'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'reference_number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd2c7500bbe73444a9a4f14220ff22e66'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'follow_up_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd4801baf7a2b4db79731bf9fb1740ed3'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'd57cd892a3fd4963afc79223ec150da7'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd5e0f9581b6f4f6dac8ad83266be010a'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'talamban'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: 'd64a464efb634b378c7dd3fc5f9f0ccd'
                        key: {
                            name: 'x_2009786_vaccinat_ebakuna_dashboard.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd7a3095416944ba0a9bc531ddfe78a30'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'clinic'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'd7e33a32007d4524998b5b3025529177'
                        key: {
                            application_file: '4be21859bc95490da04f461d6c2089ba'
                            source_artifact: 'd64a464efb634b378c7dd3fc5f9f0ccd'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd8187f6637bb45298af105f1d485ff9f'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'status'
                            value: 'full'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dacf3e9d83e9469a83481f81c93b2f13'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'duljo_fatima'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dd3ec35bed2143689bcaf1f6ef8ca618'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'adlaon'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ddaddc6975bf4954861a9a73870d951c'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'tabunan'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e04065b0a1b3485daa51b4968a51fe06'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'end_date_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e115b8c3276f46fa947b868981d25c18'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_anaphylaxis_history'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e2a83552c35407103b31b1f1b4013100'
                        key: {
                            sys_ui_section: {
                                id: 'eaa8bddac39007103b31b1f1b4013187'
                                key: {
                                    name: 'x_2009786_vaccinat_clinic'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'status'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e6a8f152c35407103b31b1f1b40131fe'
                        key: {
                            sys_ui_section: {
                                id: 'eaa8bddac39007103b31b1f1b4013187'
                                key: {
                                    name: 'x_2009786_vaccinat_clinic'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'clinic_type'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e907c41611404cd28465274a680ed034'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'dose_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e9a6881bd1774ea7b969d3282b417165'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'lahug'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'eaa8bddac39007103b31b1f1b4013187'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            caption: 'NULL'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ec2d0163121c47688eefea154e441b11'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'guadalupe'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ec77f39af19d4d048380ae21a3464705'
                        key: {
                            sys_security_acl: 'dcf61022ddd743b2baf6b185cfb7ae31'
                            sys_user_role: {
                                id: '29a1b0e3bda5477f8dcaabd1a800278f'
                                key: {
                                    name: 'x_2009786_vaccinat.citizen'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ed68e6a81f6c410a922da25bcc20a6bf'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_recent_vaccine'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'edec51c3455341d99ca8e1e402790d04'
                        key: {
                            sys_security_acl: '9ed6f0103a5e47c3bcf6b4ff0dd1a0fb'
                            sys_user_role: {
                                id: '29a1b0e3bda5477f8dcaabd1a800278f'
                                key: {
                                    name: 'x_2009786_vaccinat.citizen'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ee3f026263b84d2a94e05d38171aceab'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'eea83552c35407103b31b1f1b4013101'
                        key: {
                            sys_ui_section: {
                                id: 'eaa8bddac39007103b31b1f1b4013187'
                                key: {
                                    name: 'x_2009786_vaccinat_clinic'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'clinic_name'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ef1ad2e3beb245cb9996fcea516c7e21'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'contact_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'efb8841be07d4b83bf9d196eec695130'
                        key: {
                            sys_security_acl: '52d4e0cde9f0499d8b13f539d8b35fcb'
                            sys_user_role: {
                                id: '6ecda2a19dc742ca8e179aa202aca41c'
                                key: {
                                    name: 'x_2009786_vaccinat.provider'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f121cedfdac244b6a2bcfc7ff6578f10'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'tejero'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'f3a83552c35407103b31b1f1b40131d7'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            caption: 'NULL'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f3a8b552c35407103b31b1f1b40131e1'
                        key: {
                            sys_ui_section: {
                                id: '3ba8f152c35407103b31b1f1b40131fc'
                                key: {
                                    name: 'x_2009786_vaccinat_schedule'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'vaccine_brand'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f449bc184df54713811e85d607fb1ded'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'appointment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f726a09fe4cb4e019c1938e2052874e8'
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'symptoms'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f7919b624c6445ee88cbd625650ed2aa'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'dose_number'
                            value: 'booster'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f7a8b552c35407103b31b1f1b40131df'
                        key: {
                            sys_ui_section: {
                                id: '3ba8f152c35407103b31b1f1b40131fc'
                                key: {
                                    name: 'x_2009786_vaccinat_schedule'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'fba8b552c35407103b31b1f1b40131e4'
                        key: {
                            sys_ui_section: {
                                id: '3ba8f152c35407103b31b1f1b40131fc'
                                key: {
                                    name: 'x_2009786_vaccinat_schedule'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: 'start_date_time'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fd05db8a4b9c446dbaf56f6251f0aa75'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'novavax'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fd433ebeac864c55b7226ae832531cac'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pit_os'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fd81c69be0644b2499eaf6186b49e37b'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pamutan'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fd8dc7cde21f4ae6ace3bdf87e63ced0'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fdfb05867d3140619fd7a58e7862fcec'
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'max_capacity'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fee089509f7d41c4868a2e2f83b208a0'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'basak_pardo'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ff210f0ae7e44b79a328a6cc97ae31d6'
                        key: {
                            sys_security_acl: '464ef83ba1cb4d89bd9018267606b9b4'
                            sys_user_role: {
                                id: '731b1a2aefa54d09841fe8a7702840b5'
                                key: {
                                    name: 'x_2009786_vaccinat.clinic_staff'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ffa8b552c35407103b31b1f1b40131e2'
                        key: {
                            sys_ui_section: {
                                id: '3ba8f152c35407103b31b1f1b40131fc'
                                key: {
                                    name: 'x_2009786_vaccinat_schedule'
                                    caption: 'NULL'
                                    view: 'Default view'
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '4'
                        }
                    },
                ]
            }
        }
    }
}
