import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    appointment_citizen_create: {
                        table: 'sys_security_acl'
                        id: 'ad55c9cc7d424849bfa085570464c94b'
                        deleted: true
                    }
                    appointment_citizen_read: {
                        table: 'sys_security_acl'
                        id: 'dcf61022ddd743b2baf6b185cfb7ae31'
                        deleted: true
                    }
                    appointment_provider_read: {
                        table: 'sys_security_acl'
                        id: 'dafacc0b1a144760ba94e44d4c14c54b'
                        deleted: true
                    }
                    appointment_provider_write: {
                        table: 'sys_security_acl'
                        id: '659bb06542ae42ea867fa3abf19b3b67'
                        deleted: true
                    }
                    appointment_staff_read: {
                        table: 'sys_security_acl'
                        id: '0de97824291b465a9e06b42da3828580'
                        deleted: true
                    }
                    appointment_staff_write: {
                        table: 'sys_security_acl'
                        id: '9a223d578e8f45c08b6fa99aedc96b83'
                        deleted: true
                    }
                    archive_inbound_email: {
                        table: 'sys_hub_action_instance_v2'
                        id: '8c276446d1f8404c9ae6d1e15ef8cd10'
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
                        deleted: true
                    }
                    clinic_provider_create: {
                        table: 'sys_security_acl'
                        id: '4a7b930b564848fa8ed447fb53b2de2f'
                        deleted: true
                    }
                    clinic_provider_read: {
                        table: 'sys_security_acl'
                        id: '52d4e0cde9f0499d8b13f539d8b35fcb'
                        deleted: true
                    }
                    clinic_provider_write: {
                        table: 'sys_security_acl'
                        id: '00b88c0e6758468ab1d05045d9e7ea9a'
                        deleted: true
                    }
                    clinic_staff_read: {
                        table: 'sys_security_acl'
                        id: '5c82a54ee7924d1ba8fb027d007ccde3'
                        deleted: true
                    }
                    clinic_staff_write: {
                        table: 'sys_security_acl'
                        id: 'a86c4f3e7e3c4142a42a6cc7b15e3a1b'
                        deleted: true
                    }
                    ebakuna_app_menu: {
                        table: 'sys_app_application'
                        id: '5f2e1c8b04094508943fb205f016f6dd'
                    }
                    ebakuna_auth_api: {
                        table: 'sys_ws_definition'
                        id: 'cb514ae8318a4d7386017df2b51eb062'
                    }
                    ebakuna_auth_login_route: {
                        table: 'sys_ws_operation'
                        id: '5fcf8d40c0db49d6a91876a45d8c2d5e'
                    }
                    ebakuna_auth_register_route: {
                        table: 'sys_ws_operation'
                        id: '2cb0ad470ff346c09c4d18c3cdb9fa31'
                    }
                    ebakuna_auth_version_1: {
                        table: 'sys_ws_version'
                        id: '40a261368fda4ef3aa7b92e2093d0509'
                    }
                    ebakuna_booking_create_route: {
                        table: 'sys_ws_operation'
                        id: '7b309eec995742ddbae842bd37e6f526'
                    }
                    ebakuna_booking_review_route: {
                        table: 'sys_ws_operation'
                        id: 'd92dbe08b36d417db05fe442e90c73bc'
                    }
                    ebakuna_booking_track_route: {
                        table: 'sys_ws_operation'
                        id: 'f4e7844b82e54f01ac2d97a95e03c6f4'
                    }
                    ebakuna_email_data_module: {
                        table: 'sys_app_module'
                        id: '0518391bbfaf4d718a2ab67a3b9fe782'
                    }
                    ebakuna_market_research_module: {
                        table: 'sys_app_module'
                        id: 'f8733ddc02d148b5ad44d95e94f6fb3e'
                    }
                    ebakuna_reset_users_route: {
                        table: 'sys_ws_operation'
                        id: 'e0e57c6a4bdb49de839b2dbf2f820d91'
                    }
                    ebakuna_stats_route: {
                        table: 'sys_ws_operation'
                        id: 'bcf274bb32b0481db2bb5c5bd92e8ee4'
                    }
                    inbound_email_parser_flow: {
                        table: 'sys_hub_flow'
                        id: '5de2199d020a40fc8d1e8f3ad60ded89'
                    }
                    inbound_email_parser_trigger: {
                        table: 'sys_hub_trigger_instance_v2'
                        id: '975cc4c4c51f47c6a005024d37b724d9'
                    }
                    market_research_parser_br: {
                        table: 'sys_script'
                        id: 'ef0f333b47f54be98b378d5516f8073a'
                    }
                    medical_citizen_create: {
                        table: 'sys_security_acl'
                        id: 'c3cc61be402740ccbdd91ea43ad199c1'
                        deleted: true
                    }
                    medical_citizen_read: {
                        table: 'sys_security_acl'
                        id: '3627000ad0b24b81a2bb5570d2e8e405'
                        deleted: true
                    }
                    medical_provider_read: {
                        table: 'sys_security_acl'
                        id: '233d7326d776413a9a6104c196ed6fdc'
                        deleted: true
                    }
                    medical_staff_create: {
                        table: 'sys_security_acl'
                        id: 'ebe528d3587240c782372780862e1456'
                        deleted: true
                    }
                    medical_staff_read: {
                        table: 'sys_security_acl'
                        id: 'dc58a7cdf03643628c8c22df9c1e75bf'
                        deleted: true
                    }
                    medical_staff_write: {
                        table: 'sys_security_acl'
                        id: 'b0ee0e091b1f45f9818f59afbdb63bbf'
                        deleted: true
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '91f0aa482d3e42f99a2b275f99998235'
                    }
                    schedule_citizen_read: {
                        table: 'sys_security_acl'
                        id: '9ed6f0103a5e47c3bcf6b4ff0dd1a0fb'
                        deleted: true
                    }
                    schedule_provider_create: {
                        table: 'sys_security_acl'
                        id: '452d8db59f8b4b0e98174f721410567b'
                        deleted: true
                    }
                    schedule_provider_read: {
                        table: 'sys_security_acl'
                        id: '7b1b1c5234044ecfbad9d4361b5ae20b'
                        deleted: true
                    }
                    schedule_provider_write: {
                        table: 'sys_security_acl'
                        id: '1c8f4d42629b489991b11ddeecc154d3'
                        deleted: true
                    }
                    schedule_staff_read: {
                        table: 'sys_security_acl'
                        id: '464ef83ba1cb4d89bd9018267606b9b4'
                        deleted: true
                    }
                    schedule_staff_write: {
                        table: 'sys_security_acl'
                        id: '60f23c4682544c54969b40263ccb7200'
                        deleted: true
                    }
                    'src_server_auth-handler_js': {
                        table: 'sys_module'
                        id: '433832146696420a9ac9edbf633a1f91'
                    }
                    'src_server_credentials-store_js': {
                        table: 'sys_module'
                        id: '6b303528b10640bab7e143b407f84868'
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
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'end_date_time'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '036384ebb23742148f08886fc67867b2'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccination_status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '03b08f851d584eb4bda2ae963b6349c4'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'toong'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0481320e0d3242609ade727cdfe015cc'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '04bfee586e6d43dbac0ec8393a4d48b7'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'cogon_pardo'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '053bb1e41f9344f9909020224a861bf5'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_type'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '05e3d4cd7a364db3bf84caa9a50b0374'
                        deleted: true
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
                        table: 'sys_choice'
                        id: '0b6cc225a6a74ccfa01446e07c1ad6c8'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccine_brand'
                            value: 'pfizer'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0bf1ce0325d34cbca2f1241cccaf6627'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'preferred_time'
                            value: 't_0900_am'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0c5faffd9d0c43b9ae4a98ce7217bde1'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_covid_contact'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0c7f93497d53432eb56a5b5d462fb4e3'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'clinic'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0cc1aba0c39e4ee3b4a9b582a20296cd'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'vaccine_brand'
                            value: 'pfizer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0cc8255961c1492d9cea753530d4d931'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0cdb7875637649d99251ec0cb9041d33'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'appointment'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0d342a27fd984c67ac6a7882a927fe69'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'kamagayan'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0d49333a3e7c4b77817d6b57493e4962'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'contact_person'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0f03ac43e25149a5b853d1d4a48a570f'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0fb7d162b4274e1b9cffea09ee525767'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_fever_cough_cold'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '10248e0becc84719b582888dc0fde735'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'paril'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '10ec28355367473e86f19649fe43fd00'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'clinic'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1185d294ada54512911f5cabd135e145'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '123582406fa4427893c7c186fe2a7783'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'clinic'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '12867f069af743f2a41fab5203c24384'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'lot_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '12899aa1fbee4299b777fa6efe4ef6a2'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'algorithm'
                            language: 'en'
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
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'provider'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '13a67e2767c54f81b66c4bd0c72b13cd'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'vaccine_brand'
                            value: 'astrazeneca'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '13f7e7a1e2dd4cab8fd6ed4513e711d0'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'received_at'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '141d429d669246a484227c27c6be5cbe'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'sputnik_v'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1496486837b84036b0e76af2301e5b11'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pahina_central'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '166ac297b8724268ac87adfe117c7ddf'
                        deleted: false
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
                        table: 'sys_documentation'
                        id: '17afa820f19c4883bc8c00ba3e170265'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'email_from'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '17d6c79327154567832b57056ce9d3bd'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'reference_no'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '183a220c5be74da4afa42c9c5ee678de'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1968789fbf9e4ca2b0975f166757de6a'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'vaccine_type'
                            value: 'pfizer'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1985746e92fb4001998391cf1352230e'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1992023776d44e75be1e37de7928f34b'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'dose_number'
                            value: 'booster_2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '199ea6075a5444698f0931115e94ad04'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '19a0714ff6524dbba2ab12d5ee3a646f'
                        deleted: false
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
                        table: 'sys_dictionary'
                        id: '1a96c4a49822436e998dbd449ba1d84d'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'available_slots'
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
                        table: 'sys_documentation'
                        id: '1c9ba6d9def24b39aa5924ee95385a13'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'medical_history'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '1cd585f70baf45b7a24c9669171c7493'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1d0e1355a53144778d7a600e0f1a3325'
                        deleted: true
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
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'babag'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d922a71027c442dac8a155db5179e69'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'preferred_time'
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
                        deleted: true
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
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'pfizer_biontech'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '1e4fd8781efc46128f492e49e9476378'
                        deleted: true
                        key: {
                            application_file: '8f98bee2834640c094e5a3bc32e73dd6'
                            source_artifact: 'd64a464efb634b378c7dd3fc5f9f0ccd'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1e64c1706b404e9cb8bdc4e433b643d2'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'booking_status'
                            value: 'confirmed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1e7b084fd9154fe69ad26ccc2c3b8772'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'administered_by'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1e9f275e50864cfdba65743a678a7867'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'dose_number'
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
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'buhisan'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '1f017f9bf3a04fd39bf9d1aef55365fd'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1f3cc390c4f04b03b465ae92f172b8e9'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccine_brand'
                            value: 'sinovac'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '1f3f56c5392141c5b9a717a97e84232d'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1fc63597b0d64633b38898326f246c99'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '201229f838d449c6b5e5ff3159d993ad'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '20c69593898a43fc93915cee64c5b63b'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '232bc9a01fe1457c82c9de89c5b819aa'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'start_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2346cc98a3db4c27b1b89839079ff8fa'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'barangay'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '249470e19ef141bcb633f8235bf9a252'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccine_brand'
                            value: 'astrazeneca'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '264388d258dc4c7ca2ce84b8ac334415'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'taboan'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2690b50285674af0a067aa70003385bb'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_fever_cough_cold'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '26dbd3414ed040b69f156d964bec3b17'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'booking_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2748e99a834c48128294f273ce0db84a'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'dose_number'
                            value: 'second_dose'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '27f724e6be574d728c3feb442e93ee92'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '283a56b0ada04f0cb72528a2de3db5f1'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '28523f0b489446cd840be90837ee1602'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccination_status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2890420d2947481d849a0697ba1bb6f4'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_type'
                            value: 'cho'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '295475d9036f4290b5a0b5320f0228fb'
                        deleted: true
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
                        deleted: true
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
                        table: 'sys_documentation'
                        id: '29bfc13b6e3c4510a7181ba93c8d7675'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'password_hash'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2ac13f0519aa4b438e3c3079437e2cfa'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'citizen'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2af5b01870434225a45734af6400179d'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2b021e0f6b674594b62a24766254c28f'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'reference_no'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2b88f3962a9c49beb1fcf3e0d5d562b7'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'vaccine_brand'
                            value: 'sinovac'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2bd1f5f3830242eca79e8ff11bd59639'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'buot_taup_pardo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2bdfd664393f43c0ab1cb0f448a44a9b'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'cogon_ramos'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2bfa85658de54f1fb9e90e3f5f6b6ecb'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'health_unit'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '2c3355b0014e4ea3984e912596b8e9ec'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '2c4ad6ae5722498281bf554b7aafbf12'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'dose_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2c7bdfcfc91f4e059b8cd2d10d1ad695'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'gender'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '2d05d8c8b9bf481888d5e6088f3b0c1a'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2d41e33fb2a640b3bb8c90df08e85a9f'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'raw_body'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2de2e26c1b39491caf96c3ad25740212'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sudlon_ii'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2e74e1f31add438199effe658bfb5031'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sibugay'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2ea72123e5d641e3aae734fa89ef35d6'
                        deleted: false
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
                        table: 'sys_dictionary'
                        id: '2ef0a2d32a6a40f2af4df2bcd66e29ed'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'email'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2ff6623f3e874ae7a2ea416d95662f98'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'luz'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '301fe5b332454edfbd9d0b4684c217fe'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'status'
                            value: 'active'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '30aa5396d9a842cdbc8b7988588f2c4f'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'bulacao'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3183eeb4c4a441ea89ce8d411bb6d02b'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'algorithm'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '31c976c0016f46bd9808a41ff28a55dc'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'raw_body'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '320d6391d60a4d7d898a0d3d5a69687d'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'guba'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '322b8b66b02c4ac6b2cfe06e6e15d8c6'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '32ae09ad5973406c9d5ae12e035c63c3'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'booked_slots'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '32b2352530f04a6f9c0960cbeea863d3'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3307b060b3a8442dbc91e01dbd17c027'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'vaccine_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '33a6ee8416e145cfb5157cc5028c7588'
                        deleted: false
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
                        table: 'sys_dictionary'
                        id: '34d8a97d46ac4249a00cfa6df6ac5138'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'start_date_time'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '34faa4dee3c641aa94be40f3740ccb4a'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccination_date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '356f0edfd3c44e93b0f8cb2bbcac67da'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'calamba'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '35e992fbf1024211a1416924b04447c3'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'vaccine_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '35f89240eb184734a4878633ff441873'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '36332aa5bdea4cd98cc5da46a1e100e4'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'capacity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3653ea8c6a5f4be9862a432121dbb564'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sirao'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '36669bb7b8824f79b903ffa85123f0e4'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'remaining_slots'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '36d791dce3fd4e86a463ed49b08b5000'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccination_status'
                            value: 'fully'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '3787652be9f34bbba9367a020c83c004'
                        deleted: true
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
                        table: 'sys_documentation'
                        id: '37db9227b1864212b7f5df60a8932069'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '38384e005cc1411ca51f524ad413be97'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'vaccine_brand'
                            value: 'johnson_johnson'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3a017b73b947431ba2610c917f6cffe9'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'gender'
                            value: 'other'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3a549ae3498d4fa89e6625423c1aceb3'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'vaccine_brand'
                            value: 'sputnik'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '3adbfe81a34342cf94913948881b0273'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'processing_state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3b47f991bb604860840fe1dde020eb9b'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'active'
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
                        table: 'sys_choice'
                        id: '3e016457a3ad4eeaba693012bde2e98e'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'vaccine_brand'
                            value: 'moderna'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3e502ae8f70047ea85cfd1f252693605'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '3f496f60e1834a57ba352164e4d1e4ad'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
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
                        deleted: true
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
                        id: '400bd09fe50e4549893a6ad698a37378'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'capacity'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4101792c07a048e8bce5dff8dd204700'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_pregnant_breastfeeding'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '412e0909ae8a4ad69b31712011f2a3b5'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '427eb6786bd347bfab9f47e8aa52dc85'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'status'
                            value: 'open'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4311b6f958504de58dbe7b475ce24b51'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'status'
                            value: 'inactive'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '433338a611b746f3b8253214fc80cf1c'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'mambaling'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4441945af3f5418ab51d4b732df87e2a'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'contact_number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '45483c77f022486f9289def7812d70e7'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'email_subject'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4553316fd5a64ba89251f4b470b2d509'
                        deleted: true
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
                        table: 'sys_ui_policy'
                        id: '45a6290aeedc432ca9e1e7ade2977483'
                        key: {
                            table: 'x_2009786_vaccinat_market_research'
                            short_description: 'Hide internal parsing guard and lock email-derived fields'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4615a4633af34cc98f6ce1e3bd8de749'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'dose_number'
                            value: 'first_dose'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '466f8a2cd53e441e9e07d5758eadf224'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '478b3e8a3a5744ec83a5c83a90d00f09'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'contact_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '479b74fd01da431bbfe4bb607ecfd61e'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'max_capacity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '47cdb92aab5247c4b6896ce0cb02a9aa'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'moderna'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '48453bbb14e048bb8d525a4516b21ef8'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'basak_san_nicolas'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '48caf0bb970748db99262acfa6691e57'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'date_of_birth'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4b22e49f2d9d4ccc9f425ac8d10e5a9a'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'barangay'
                            language: 'en'
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
                        table: 'sys_dictionary'
                        id: '4dca3d400cc7430986cbf859912fd29b'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'booking_status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4e365e19c6ce48dbb136cc256fc8fa76'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'barangay'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4e73c65ee1fc432d8382631c4d798d7f'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'preferred_time'
                            value: 't_1200_pm'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4f74693a03694f0681a00698b45188dc'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'suba_san_nicolas'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4fcad0e6a63840de80867dce399cd2e0'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'reference_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4fe2da3697f64b9196c135a7ca44e892'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'san_roque'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5011eee3b4f2466b90e07c2fc208d55b'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5116da751ffb442ea6f304b31e77ace5'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '51b1fc4f795c42839946a1b9de07bf78'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'bonbon'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '51fd8a037cf945ffaf10d9748ccf1485'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5202a93c632746088c019c702a7bb14a'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'total_slots'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5349447876b04dd9bb8ef7d8fa0c49ff'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'patient_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '53506ad0fe4f4e2482ae448a172706c8'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '53b64742f2f14fdcb6d11b6028a4ba54'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'quiot_pardo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '53e80c4a385242dc94992e600af21880'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pung_ol_sibugay'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '54072bbbf6ec4c599b0b51b29bb02cfc'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'subject'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '550fce0111b9476d9d906ac04e116734'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'full_name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '557eac60b3034ffbba4eae02160a675d'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'clinic'
                            language: 'en'
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
                        id: '55a397ff6cb741a9ab6eb99ce5e53bd2'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'dose_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '566adca4ed774895853c186f84d006d1'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '56e5b29a194e44baae1eeb8ebc479e8d'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'preferred_time'
                            value: 't_0100_pm'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '56f0e8df63424538961bf0a6c34e4432'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '570c9404058e4f36ace62e0f02f5b863'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pahina_san_nicolas'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '579175c5387b40e3bc2f33b16c55e251'
                        key: {
                            endpoint: 'x_2009786_vaccinat_ebakuna.do'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '57a3433c4dc041f6a3d6a94bd962420f'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'tagbao'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: '5849ac683e0d4f37adbafe3b4fc0636a'
                        deleted: true
                        key: {
                            application_file: '1da271ea884a402eb8ff128e4113085c'
                            source_artifact: 'd64a464efb634b378c7dd3fc5f9f0ccd'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '58a9c1398f7e4866bc2b11ae039a8eca'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '597b68ff5f7244ee883992d5519c4ecc'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'patient_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '59c824214db548bebe290be90b54ad8f'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'kalunasan'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5a5b8506365c43cb889ebaa185851ea5'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'processing_state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5a937f5d74e14dd6bce65ccd6f54bb07'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'password_salt'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5bbb73f4b721460699053d2496dc79bf'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'total_slots'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5bc9fc7455244399bcfe70fd609b64b4'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'vaccine_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5be12d1ae7a745129f39bd4f00ca4790'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5bf2a76c05de4ff1a26d150379406ddd'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'schedule_slot'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5c1501d63d1d41a59eb6e94f7747e618'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '5cb3c3fe25594ccd908fb4181b7f44ba'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'vaccine_type'
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
                        table: 'sys_dictionary'
                        id: '5e26b260db1d40b991d77272d0fc2c85'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'patient_name'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5e70739535de42dab239162c89798bfe'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_type'
                            value: 'private'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5f3649f433bf4dd5a560f7de91296509'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'lorega_san_miguel'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5f7d0f3d3b9d49598b028ac043f33249'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'summary'
                            language: 'en'
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
                        table: 'sys_documentation'
                        id: '603956780f684e038160508c8c9a2895'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'password_salt'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '608828214e30443c81f2964110d1cf6c'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'end_date_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '608d6573e636401ea3e411d00b5e0254'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'date_of_birth'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '60bbeb89010e4dc68917a1ed82f526cb'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'next_dose_due'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '61f344f5e817480a9403e8ce984222de'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '623b8db06e7f4577bbe41d69a759a13f'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'date_of_birth'
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
                        table: 'sys_documentation'
                        id: '62c043ea7e3f400fa7c36485697bbddb'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'second_dose_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '62ecd2d4c62347e5a214ad1ffb2006de'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'labangon'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '62ff13bf22874281bb360a6a28c703bf'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'vaccine_brand'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6382f2d06af34d48997a1bedfa5db71c'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'citizen_age'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '63b14c35839f4695b947767cdfdf35c2'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'source_email'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '63f88a8334c74c7c8344511f90486ee4'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'processing_state'
                            value: 'archived'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '64faa3e794a449a5b13daaf93ef00853'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'max_capacity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '66059f6e423d421b8e35bda3e03f92ee'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'dose_number'
                            value: 'first'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6693efb027714b9db7a6275b8327fce8'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'active'
                            language: 'en'
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
                        id: '675214c3133d4b99965e6fa353c10d18'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'vaccine_brand'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '67a8923d475d4b50b17e1f0681cd1501'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_covid_contact'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '681720531ee44d6a92ea8f0a134b7dd6'
                        deleted: true
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
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_anaphylaxis_history'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6a1e8af7918644cf96a470e77021e990'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'parsing_guard'
                            language: 'en'
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
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6ac18bf559b74afa9cde2e744c5d8cfa'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '6ba03d25cfa6424f99d9d21d98df911f'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'end_time'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6c523bca91044fdd8d71c235b9484a35'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'san_jose'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6c95940aee364ef0b6412b7a112b2722'
                        deleted: true
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
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'day_as'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6e612906520a41ceace712007ee1750d'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'date_of_birth'
                            language: 'en'
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
                        table: 'sn_glider_source_artifact_m2m'
                        id: '6fb6ded2310245a4a72e134dc134728d'
                        key: {
                            application_file: '579175c5387b40e3bc2f33b16c55e251'
                            source_artifact: 'f9937a055f1a4f0390448fd7d1359de0'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '702231d249b04d47a14be991d5b5916e'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'contact_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '70a82abface24da49788002658c20a02'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_type'
                            value: 'rhu'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '71344b417da44754a97106e2cfb51f26'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'topic'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7178d15bdab249839a20381c08f0bf42'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'symptoms'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '72cd93da389b4d3cb7ab09326e24d3d6'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'appointment_date'
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
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sapangdaku'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7479d357deb54352ac00be5cb4f452d9'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'banilad'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '747f0a078b3a42a8bfbb4060866333b1'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'dose_number'
                            value: 'booster'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '749ce70e8b3f486187687a60c1cbb0d5'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 't_padilla'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '74d9e57dda4c4cb182b82869571d5c67'
                        deleted: true
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
                        id: '7596e1d51b4e413f98aaac6b49a1a370'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'location'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '75a781896bc04e47aed54865ab8e4bcd'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'address'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '76585326901d40d1a549e1ade91fb64b'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccination_status'
                            value: 'boosted'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '769fcb4e2c4b4644906e3e3916aacc92'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7768723ad05a46c2968212d2a8ef3039'
                        deleted: false
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
                        table: 'sys_documentation'
                        id: '77b3496e50d34d4b8ef26e9bb9f96f7b'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'schedule_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '77cc7d3115e0488fabaf528bcb3ef5d6'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'gender'
                            value: 'female'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '77eb8924446348e1a553b91f6f8a4d53'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '783e15376cbf48a6b8290a888b2cb371'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'appointment_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '7a1ee3ce6e1e4edcb4f9ff3fbbbdb0e2'
                        deleted: true
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
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'apas'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7c468deefb9441618e9242cb014c1b9b'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'booking_status'
                            value: 'completed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7d426f57a98e4e7795b7f83601d9c184'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'citizen'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7df408f75e8f4eec852e6c63bbd73fe1'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '81786959f10a4893b0e53c265906afb3'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'booked_slots'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '83922f3dbda241c9a52e1af298af8c55'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccine_brand'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '83a08b0f84174db6b78a843a222e4efa'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8468bea245064d5aaacfbf5d00c44976'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'date_of_birth'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '85226ea4d50b48f4b5171b13b0cf0e2e'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'body_text'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '852a6a0eb061403891804230dd2b53ce'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'consent_signed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '854d15cd8b71412c91874f7b28a9800e'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'status'
                            value: 'open'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '86f47cc8a628465f98819be9b1f25de1'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'end_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '873c54651b564aa39170a74149f9e479'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'cambinocot'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '87664ca91fb2461ebc1ae1867c421acd'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'zapatera'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '881c868091744db5a428de9fc2a3da77'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'clinic_schedule'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '88987e590489408cb774952944977a7b'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'preferred_time'
                            value: 't_1000_am'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '88bd10c9e627460496d343975baa36a0'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8946e4adfb5b47579d0ea9a323e62f81'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'topic'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '8a74e9313c6b40ea83fb70f5925671bc'
                        deleted: true
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
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'busay'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8bf424f20585451683f86122b4728e24'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'vaccine_type'
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
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'covaxin'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8c874d1fa0d141f4b44de039b8565279'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'contact_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8ccf4a0363d441019959cc2749793755'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'clinic'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8cda7d7af6214ea9b59b39fba1fc797d'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8d22d1b4eee1424bbb236764fe0fb3d9'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'dose_number'
                            value: 'first'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8d393a1d63fc4a8ba27f821bbf00ff28'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'start_time'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8da5e4f7b22f4eaa9e661720556dc425'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccine_brand'
                            value: 'janssen'
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
                        deleted: true
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
                        table: 'sys_choice_set'
                        id: '8f8c5c1745974b5183b586e4c74d2d8d'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'gender'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '8f98bee2834640c094e5a3bc32e73dd6'
                        deleted: true
                        key: {
                            endpoint: 'x_2009786_vaccinat_ebakuna_dashboard.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '903915d01a794ab88cda6f49ffd23d75'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'preferred_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '906f372aa1f54b0887f87981e48695f4'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'clinic_schedule'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '90f11857dcdf4560b79887526eb56b07'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'schedule_date'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '911b4ceba20543d98794971e58a9d3ec'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: '915d221924ad45bf9128c2e77a59c2fc'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'parsing_guard'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9180603dfa134c9daee52d0d20e5631a'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'status'
                            value: 'new'
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
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'hippodromo'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '941fa5f6023148d89123738ce4a06375'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pari_an'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9522138860264b2190f1dca010ad4025'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'preferred_time'
                            value: 't_0200_pm'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '95694b6e2e664c24ac62246b51da4d56'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'max_capacity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '958fcaa5407540199eff38f44e4b0ff0'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'barangay'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '960af9db8c754bbb8d87366fcec196c5'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'start_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '961aa11205db44e68405fc853946ee13'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9627769797c54f7eae723ead6ebf23bb'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'username'
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
                        table: 'sys_dictionary'
                        id: '96b815aa235c4cf6ae318d0c531e8a8a'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'appointment'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '9719b1cf96c54703a2c83e8c20428873'
                        deleted: true
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
                        id: '98fe4a8b08854cb4becc275d8e737cce'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'schedule_slot'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '99af7c4fd6674732b2b8d68fe1ae371f'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'citizen'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9a35373ef8d44cce879ef73a7642b736'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'end_date_time'
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
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'carreta'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '9bef79b08be145fb9d711909f9ba26ed'
                        key: {
                            ui_policy: {
                                id: '45a6290aeedc432ca9e1e7ade2977483'
                                key: {
                                    table: 'x_2009786_vaccinat_market_research'
                                    short_description: 'Hide internal parsing guard and lock email-derived fields'
                                }
                            }
                            field: 'email_subject'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9c340d686372490791eef0ad502d3239'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'vaccine_brand'
                            value: 'covaxin'
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
                        table: 'sys_documentation'
                        id: '9e460f4eed064c15b0a6c22c78b9916e'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'dose_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9e54b87e77144858863b83ad51c94837'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'preferred_time'
                            value: 't_1100_am'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9e90346e1ea647a084ed389ea81dfdc8'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'email_subject'
                            language: 'en'
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
                        table: 'sys_choice_set'
                        id: '9ed0856c46ef47afb68be13eaa796a84'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'vaccine_brand'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9f30741749dc426990a48b9208b7b88f'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'clinic'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9f549ae380f1435a909310968d4baa2f'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'camputhaw'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9f57ebfa17b04f79954e62be026b2af5'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'clinic'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a0209405b1f544eeb68332cbf27257ef'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccine_brand'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a03e8e5559754d3fbf5892d2ac34262d'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'vaccine_type'
                            value: 'moderna'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a0a6d365973c4eb6ab50cefdf3ed28ff'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'gender'
                            value: 'male'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a19d2e431a584071a5a7ea28d41e5293'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'astrazeneca'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a1d9eaca43da40de9f08ecb1fa254a00'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sudlon_i'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a20d0ffaf97b4f2c98793c051b50c45b'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pasil'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a3fd74e4d55d4d04986f20f843fbebe3'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'sinopharm'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a451d39897e4471aa7d633278fbb627c'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sawang_calero'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a47dee81e93a400b9564e16802a3a4fa'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'agsungot'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a53ecdd007874c15b184e087a83a42c8'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a6c24331736143f1a116152c2654bac7'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'vaccine_type'
                            value: 'janssen'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a795adb62af34799adf4bf506734f3a1'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'status'
                            value: 'confirmed'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'a818564ed4f2413b94e57449653a8e68'
                        key: {
                            application_file: 'b670ca6289cc4fe4b21be73ad4b1f8af'
                            source_artifact: 'f9937a055f1a4f0390448fd7d1359de0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a8d24d55960a48d19ef5da08394716af'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'gender'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'a8d85ce95b824955aabd87652a828a1f'
                        deleted: true
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
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'follow_up_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a935b3ecd5164a339506b883f6281cd4'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'start_time'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a97f58ea19df43c3baaeb34fb4354050'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'next_dose_due'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a9d541dc570e4d89bcb382de10d8ec30'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'phone'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'aad62a08b3b5466e841b7a64edd4c43d'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'kalubihan'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ab7ae1ff089847f4bbae377276073e71'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'lusaran'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'abd1337dfbdd4168bfdf7402c7f838f4'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'sinovac'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ac84a8d2d9034054a1c392b46a5c1998'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'schedule_slot'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'adbeda2fd1c94540ac3044029183522a'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ae39a496fc7e4732b2f91441b7b4e290'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'dose_number'
                            value: 'second'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'aeb0f8116aef4b0caf586f9ff3af36a8'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'username'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'af7812c7aaf449428b0a3fea0c11e9d8'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'bacayan'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'afb54158ca0245fc92a1fd2e4771fedf'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'medical_history'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'afcb5416b9e8480980ab97c59ce74502'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_pregnant_breastfeeding'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b05ff59ab5df4a2cab91063d6b4aaaf5'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'dose_number'
                            value: 'first'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b0882bea840243d39a71e3a7d74fb6e6'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'preferred_time'
                            value: 't_0300_pm'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b2612ed50b78412d9146327cd626b7bb'
                        deleted: true
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
                        deleted: true
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
                        table: 'sys_documentation'
                        id: 'b339e94bf7a8461388a315e7900dc814'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'phone'
                            language: 'en'
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
                        id: 'b49868fa106444a0988a62d39f365211'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'vaccine_brand'
                            value: 'sinopharm'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b609cba042254b4ab8aa86dc30e079c9'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'from_address'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b61e5633ab354c7e809b871ccb88ce72'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'sinsin'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'b670ca6289cc4fe4b21be73ad4b1f8af'
                        key: {
                            name: 'x_2009786_vaccinat/ebakuna-main.js.map'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b69e7cae3f0b45b0bfaca327c41485c2'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'email_from'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b6d283d20ca242d083ec6c7bbe1abca4'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'status'
                            value: 'parsed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b6f8fb28450a48f5841bb8a9a22ed716'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'barangay'
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
                        id: 'b7b5a01f845b4fc0991d175067d97c07'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'dose_number'
                            value: 'second'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b826a92b6690472a8a13c515aa52bd8c'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'san_nicolas_central'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b8b95bd86a5542b49e7fe19e6250a421'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'kasambagan'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b8bbc3c8f9ef4f76ae04221319455f92'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'processing_state'
                            value: 'new'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b8d99408d2514c7f96af65b4eb700bb9'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'mabolo'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b909ca84831c4148a4bd2036277fec19'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'full_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b98ec4e6564b4acabb049d93f7ba660d'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'punta_princesa'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b9a69f11fdcf4175b6766653ad5fa1ba'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'health_unit'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b9b4558713874db1851a26e535071004'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'vaccine_type'
                            value: 'sinovac'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b9f51a9384ab4ac2af4ec5f86f1ea598'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'inayawan'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ba716013ec2d45c78de1a15fce240673'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'barangay'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'ba79e9341ec044628d00d49500041331'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bab72430f1c549618ec6294f36088e0e'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'user'
                        }
                    },
                    {
                        table: 'sys_ux_lib_asset'
                        id: 'bad2561914234f13938569fd0fa9eb32'
                        key: {
                            name: 'x_2009786_vaccinat/ebakuna-main'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bb3a559a945e4caa86a7a59e46ab3e14'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'special_requirements'
                            language: 'en'
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
                        table: 'sys_choice_set'
                        id: 'bbffe9edd1c5442a9ee6e0dead5b06c8'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'status'
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
                        id: 'bc2ec2bd517b438b8824126ef755e629'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'address'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'bd10ed882f2c4e08954db547bcab758a'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccine_brand'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'be453f494e614290bc8acaeefc8bbc2d'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'citizen'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bec91f18639f4869841db1e5002ed324'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'status'
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
                        table: 'sys_dictionary'
                        id: 'bfacd43905084fc0858e4116387e9819'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'address'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c089673140b34becad089b1a1cabc65a'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'available_slots'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c0e56c1d490c4055909145fbceb935c4'
                        deleted: true
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
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'taptap'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c1cc785018bc48ba91a4181aa059ef13'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c1fa8eb00e6c49da9fa79344f47740a8'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'consent_signed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c3587ddfc39f441b933496695cb60c64'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'date_of_birth'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c3791eafcb3f4afd942427b712079e33'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c3c72f9a797d4c5481552988686dbf8f'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'booking_reference'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c3d4b32203e94f2f892a378aaa3c611f'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'santa_cruz'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c4a42fbd4145423f950fe2ac131f8ac1'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'booking_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c4f2bd81fcc74afba38ed6a526bcec28'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccination_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c56ea3b73a454586bc25bf9faa7e9d21'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'location'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c5b07e51d83543a9b45de1d3649abc72'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'body_text'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c5d7ef088e82424c902f20518f0532d9'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'citizen_name'
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
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'ermita'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c68687a6344d4cdfac1393f1a41b58f7'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'from_address'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c6eddbe5708b4887bd4c35827229dfd4'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'barangay'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c73c81887ff54044926068e461ffaccd'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'end_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c76b009dc42e45259cfe902c9de1b92e'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'vaccine_brand'
                            value: 'novavax'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c86b53501bbc4f8b84ea221bcb611761'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_recent_vaccine'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c9326af07a0147ff81e5ab4954203cf1'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'subject'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c94e3c0b745c4f42bca0281a5b879331'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'inbound_email'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c94fdcb4c0bc4782b09090d9c21e1ba4'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'start_date_time'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c9613c0342db494a928ecd5ee4252bdd'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'clinic_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c967cc33b30f4a67bda71fda1d112016'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'start_date_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c9aa9908a3294885993eeb06de51fc6c'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'special_requirements'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'c9cb9524be39488f9a1076e8a99643a1'
                        key: {
                            application_file: 'bad2561914234f13938569fd0fa9eb32'
                            source_artifact: 'f9937a055f1a4f0390448fd7d1359de0'
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
                        table: 'sys_documentation'
                        id: 'cd34c7cf605d4f6896575a28d02375e1'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'first_dose_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cdf23d07427f4214ade983fcb9bf7821'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'dose_number'
                            value: 'second'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ce1df64a3a0147908467039ee838ef5e'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'password_hash'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ce2d074f8a134393831ed7757ba16a5e'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'tisa'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ce3abc3526694fe299702ee3f957a97f'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'kinasang_an_pardo'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cec5f6ad64ad4a6a88c9badc3d767708'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'source_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cef10ab670b84cd3b2be4b5a73d13d0d'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pulangbato'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cfbc6684d3714010870334a631500d02'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'booking_status'
                            value: 'pending'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cfe4741385204e13a65a2df9ab591ebf'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'provider'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cffc3f21c5ac428ebcb5887d220f8c97'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'barangay'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd0df7ce3237f4ac79785f082fab41b56'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'dose_number'
                            value: 'booster_1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd1773b8ebfe941aa90494c88bd69b9b8'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'remaining_slots'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd1b11da1973144d89cb3a34c0144d010'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'reference_number'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd1d0549638c5461dba9870647ae8994c'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'dose_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd29f5080932d4405b8ab9c5aede41f14'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'remaining_slots'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd2c7500bbe73444a9a4f14220ff22e66'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'follow_up_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd2ea05c1da5f4fe9ab01919d98d0bef1'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'inbound_email'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd4801baf7a2b4db79731bf9fb1740ed3'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd500fa9afdcb45ccbf84fd22915448bf'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'status'
                            value: 'error'
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
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'talamban'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: 'd64a464efb634b378c7dd3fc5f9f0ccd'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_ebakuna_dashboard.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd756417ab8dc43799088b37d316e8583'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'processing_state'
                            value: 'error'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd7a3095416944ba0a9bc531ddfe78a30'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'clinic'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact_m2m'
                        id: 'd7e33a32007d4524998b5b3025529177'
                        deleted: true
                        key: {
                            application_file: '4be21859bc95490da04f461d6c2089ba'
                            source_artifact: 'd64a464efb634b378c7dd3fc5f9f0ccd'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd8187f6637bb45298af105f1d485ff9f'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'status'
                            value: 'full'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd996c0a470604634b5f5bddba5454b13'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'status'
                            value: 'full'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dacf3e9d83e9469a83481f81c93b2f13'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'duljo_fatima'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dadc1eb90c184f69bcd8a37df9a42f03'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'side_effects'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dccdb1b926594bccb60850f1be533791'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'end_time'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'dd3ec35bed2143689bcaf1f6ef8ca618'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'adlaon'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dd4e8675f2d54bce8737c43278c214bb'
                        key: {
                            name: 'x_2009786_vaccinat_market_research'
                            element: 'summary'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ddaddc6975bf4954861a9a73870d951c'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'tabunan'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'def5a375a04c456d84232e4e709c9fb2'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'lot_number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'df35f42a90c240239d7d280b479b8c6f'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'administered_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'df3ec89acd854abaa346f87fa99a784a'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'vaccine_type'
                            value: 'astrazeneca'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e03dee1f4a1048de9fe79b6bec539c81'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'contact_person'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e04065b0a1b3485daa51b4968a51fe06'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'end_date_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e0c919c66d1a46cfbbefceee191d37a8'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'dose_number'
                            value: 'st'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e115b8c3276f46fa947b868981d25c18'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_anaphylaxis_history'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e27e319c57c7481a99cdd06840721815'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'status'
                            value: 'scheduled'
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
                        table: 'sys_documentation'
                        id: 'e3a3ff06436f42af8c4a49afed8365b6'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'patient_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e531ea390b6c481ba1dd7d361cdc83a4'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'first_dose_date'
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
                        table: 'sys_choice_set'
                        id: 'e6c44137b2b749869374cffbdfb0baa0'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'e7d50bc91edc4146beb8540ec39b374f'
                        key: {
                            ui_policy: {
                                id: '45a6290aeedc432ca9e1e7ade2977483'
                                key: {
                                    table: 'x_2009786_vaccinat_market_research'
                                    short_description: 'Hide internal parsing guard and lock email-derived fields'
                                }
                            }
                            field: 'parsing_guard'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'e8cf96a07e62458cac0240b370110c9b'
                        key: {
                            ui_policy: {
                                id: '45a6290aeedc432ca9e1e7ade2977483'
                                key: {
                                    table: 'x_2009786_vaccinat_market_research'
                                    short_description: 'Hide internal parsing guard and lock email-derived fields'
                                }
                            }
                            field: 'email_from'
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
                        id: 'e9885dcfca5049158aa031e20bf8a0af'
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'capitol_site'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'e994a972c3874cd886c2dd9203c3a65f'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'booking_status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e9a6881bd1774ea7b969d3282b417165'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'lahug'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'e9e435b819094f6b9b661f0ae60ac150'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'preferred_time'
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
                        table: 'sys_choice_set'
                        id: 'eb0de6b05d4c4729bb70c17a7463e6e8'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'dose_number'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ec2d0163121c47688eefea154e441b11'
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'guadalupe'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ec77f39af19d4d048380ae21a3464705'
                        deleted: true
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
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'hd_recent_vaccine'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'edc46bfee34a4321bef32ac7a1a8a544'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccination_status'
                            value: 'partial'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'edec51c3455341d99ca8e1e402790d04'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: 'ee3d1aef70854c0390e2dead38dc3b52'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'second_dose_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ee3f026263b84d2a94e05d38171aceab'
                        deleted: false
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
                        table: 'sys_dictionary'
                        id: 'ef17e55fbc934b2790dc7967b51a775b'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'processing_state'
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
                        table: 'sys_documentation'
                        id: 'ef3d7ed36f1e4f7f87abd0aa81b00600'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'citizen_age'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ef8b1e4d6a4543aa8ab3fd2a5ab33c19'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'remaining_slots'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'efb8841be07d4b83bf9d196eec695130'
                        deleted: true
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
                        table: 'sys_documentation'
                        id: 'f0ed1d905ff94ca299cae34133a01887'
                        key: {
                            name: 'x_2009786_vaccinat_email_data'
                            element: 'received_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f121cedfdac244b6a2bcfc7ff6578f10'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'tejero'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f1dbcf99dd074a12b25140f71d81ac97'
                        key: {
                            name: 'x_2009786_vaccinat_appointment'
                            element: 'dose_number'
                            value: 'nd'
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
                        deleted: false
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'appointment'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f62a1dbcae764e9b89cc114dc79d9f8d'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccine_brand'
                            value: 'moderna'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f6aa98369b0944cca8212036597a4b39'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'booking_status'
                            value: 'cancelled'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f726a09fe4cb4e019c1938e2052874e8'
                        deleted: false
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
                        table: 'sys_documentation'
                        id: 'f8df0c693b7344159337aed943d5e9da'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'side_effects'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sn_glider_source_artifact'
                        id: 'f9937a055f1a4f0390448fd7d1359de0'
                        key: {
                            name: 'x_2009786_vaccinat_ebakuna.do - BYOUI Files'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fb483a2dd0cb4ef68327affb44664ea7'
                        key: {
                            name: 'x_2009786_vaccinat_user_credential'
                            element: 'user'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'fb6ef1fd47c842768335b9101d4b6e75'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fb90a0f7ee1a4425aca786f9a2d777e6'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_medical_record'
                            element: 'vaccination_date'
                            language: 'en'
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
                        table: 'sys_documentation'
                        id: 'fc6b064095ae4b9fbcf4e31a94757262'
                        key: {
                            name: 'x_2009786_vaccinat_citizen_booking'
                            element: 'citizen_name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fd05db8a4b9c446dbaf56f6251f0aa75'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'vaccine_brand'
                            value: 'novavax'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fd433ebeac864c55b7226ae832531cac'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pit_os'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fd81c69be0644b2499eaf6186b49e37b'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'pamutan'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fd8dc7cde21f4ae6ace3bdf87e63ced0'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fdfb05867d3140619fd7a58e7862fcec'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_schedule'
                            element: 'max_capacity'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fee089509f7d41c4868a2e2f83b208a0'
                        deleted: true
                        key: {
                            name: 'x_2009786_vaccinat_clinic'
                            element: 'barangay'
                            value: 'basak_pardo'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fefa3e4809884714a203deb7cc060d64'
                        key: {
                            name: 'x_2009786_vaccinat_clinic_schedule'
                            element: 'start_date_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'ff210f0ae7e44b79a328a6cc97ae31d6'
                        deleted: true
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
